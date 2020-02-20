import React, {Component} from 'react'

export default class AddItem extends Component {

    state = {
        name: {value: '', message: ''},
        condition: {value: '', message: ''},
        category: {value: '', message: ''},
        description: {value: '', message: ''},
        availability: {value: true, message: ''},
        images: {value: {}, message: ''},

    };

    handleChange = (event) => {
        switch (event.target.name) {
            case('name'):
                if (event.target.value.length > 50 || event.target.value.length < 3) {
                    console.log(event.target.value.length);
                    this.setState({'name': {value: "", message: 'please enter a  name with 3 to 50 letters'}});
                    break;
                }
            case('condition'):
                if (event.target.value === 'select a condition ...') {
                    console.log(event.target.value);
                    this.setState({'condition': {value: "", message: 'please choose a condition'}});
                    break;
                }
            case('category'):
                if (event.target.value === 'select a category ...') {
                    console.log(event.target.value);
                    this.setState({'category': {value: "", message: 'please choose a category'}});
                    break;
                }
            case('images1'):
                if (event.target.name === 'images') {
                    console.log(event.target.files[0])
                    this.setState({
                        'images': {
                            value: [this.state.images.value, ...event.target.files[0]],
                            message: ''
                        }
                    });
                    break;
                }
            default:
                this.setState({[event.target.name]: {value: event.target.value, message: ""}});

        }
        // if (event.target.name === 'name') {
        //     if (event.target.value.length > 50 || event.target.value.length < 3) {
        //         console.log(event.target.value.length);
        //         this.setState({'name': {value: "", message: 'please enter a  name with 3 to 50 letters'}});
        //         return;
        //     }
        // }
        // if (event.target.name === 'condition') {
        //     if (event.target.value === 'select a condition ...') {
        //         console.log(event.target.value);
        //         this.setState({'condition': {value: "", message: 'please choose a condition'}});
        //         return;
        //     }
        // }
        // if (event.target.name === 'category') {
        //     console.log(event.target.value);
        //     if (event.target.value === 'select a category ...') {
        //         console.log(event.target.value);
        //         this.setState({'category': {value: "", message: 'please choose a category'}});
        //         return;
        //     }
        //
        // }
        // if(event.target.name === 'images'){
        //     console.log(event.target.files[0])
        //     this.setState({'images': {value: [this.state.images.value,...event.target.files], message: ''}});
        //     return;
        // }
        // else this.setState({[event.target.name]: {value: event.target.value, message: ""}});

        this.setState({[event.target.name]: {value: event.target.value, message: ""}})
    }

    validateForm = () => {
        let valid = Object.keys(this.state).filter(key => {
            console.log(this.state[key].message.length)
            return (this.state[key].message.length > 0)
        })

        return valid.length === 0
    }

    handleLoad = (event) => {
        const reader = new FileReader()
        const file = event.target.files[0]
        reader.readAsDataURL(file)
        let valueObj = {}
        valueObj.filename = file.name;
        valueObj['content-type'] = file.type;
        valueObj.content =reader.result
        console.log('in handel event', valueObj)

        reader.onload = (event) => {
            console.log('in onload');
            this.setState({images: {value: {...valueObj}, message: ''}})
            console.log(this.state.images.value)
        }

    }
    handleSubmit = (event) => {
        event.preventDefault()
        if (this.validateForm()) {

            debugger;
            let myForm = document.forms.myForm;
            let data = new FormData(myForm);

            fetch('http://localhost:8000/api/share_item/', {
                method: 'POST',
                body: data,
                // headers: {"Content-Type": "multipart/form-data"}
            })
                .then(resp => resp.json())
                .then(resp => {
                    console.log('in fetch', resp);
                    // this.setState({
                    //     name: {value: ''},
                    //     condition: {value: ''},
                    //     category: {value: ''},
                    //     description: {value: ''},
                    //     availability: {value: true},
                    //     images: {value: {}},
                    //
                    // })
                })
                .catch(error => {
                    console.error(error);
                })

        }


    }

    render() {
        const conditions = ['select a condition ...', 'New', 'Like New', 'Used', 'Functional']
        const categories = ['select a category ...', 'Home and Interior', 'Home and Garden', 'Family and Kids', 'Motors']
        return (
            <form onSubmit={this.handleSubmit} name="myForm">
                <div className="form-group">
                    <label>
                        Name of Item
                        <input className="form-control" placeholder='Name of Item' type="text"
                               value={this.state.value}
                               onChange={this.handleChange} name='name' required/>
                    </label>
                    <div key='name' className="invalid-feedback d-block">
                        {this.state.name['message']}
                    </div>
                </div>
                <div className="form-group">
                    <label>
                        Category</label>

                    <select className="form-control" onChange={this.handleChange} name='category' required>
                        {
                            categories.map(option => <option value={`${option}`}
                                                             key={`${option}`}>{`${option}`}</option>)
                        }
                    </select>
                    <div key='category' className="invalid-feedback d-block">
                        {this.state.category['message']}
                    </div>
                </div>
                <div className="form-group">
                    <label>Condition</label>

                    <select className="form-control" onChange={this.handleChange} name='condition'
                            placeholder='select a condition' required>

                        {
                            conditions.map(option => <option value={`${option}`}
                                                             key={`${option}`}>{`${option}`}</option>)
                        }
                    </select>
                    <div key='condition' className="invalid-feedback d-block">
                        {this.state.condition['message']}
                    </div>
                </div>
                <div className="form-group">
                    <label>
                        Description
                        <textarea className="form-control" rows="4" onChange={this.handleChange}
                                  name='description'/>
                    </label></div>
                <div className="form-group">
                    <label>Image
                        <input className="form-control-file" type="file" name='images'
                               onChangeCapture={this.handleLoad}/>
                    </label></div>
                <div className="form-check">
                    <input type="checkbox" checked="checked" className="form-check-input" name='availability'
                           onChange={this.handleChange}/>
                    <label className="form-check-label">Available</label>
                </div>
                <button type="submit" className="btn btn-primary mb-2" value='submit'>Submit</button>
            </form>
        );
    }
}