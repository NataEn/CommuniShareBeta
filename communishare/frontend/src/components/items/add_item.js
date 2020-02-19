import React, {Component} from 'react'

export default class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {value: '', message: ''},
            condition: {value: '', message: ''},
            category: {value: '', message: ''},
            description: {value: '', message: ''},
            availability: {value: true, message: ''},
            image: {value: '', message: ''}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.name === 'name') {
            if (event.target.value.length > 50 || event.target.value.length < 3) ;
            this.setState({'name': {value: "", message: 'please enter a  name with 3 to 50 letters'}})
            return;
        }
        this.setState({[event.target.name]: {value: event.target.value, message: ""}});
    }

    handleSubmit(event) {
        event.preventDefault()
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    render() {
        const conditions = ['New', 'Like New', 'Used', 'Functional']
        const categories = ['Home and Interior', 'Home and Garden', 'Family and Kids', 'Motors']
        return (
            <form onSubmit={this.handleSubmit} action='#'>
                <div className="form-group">
                    <label>
                        Name of Item
                        <input className="form-control" placeholder='Name of Item' type="text"
                               value={this.state.value}
                               onChange={this.handleChange} name='name' required/>
                    </label>
                    <div className="invalid-feedback d-block">
                        {this.state.name['message']}
                    </div>
                </div>
                <div className="form-group">
                    <label>
                        Category</label>
                    <select className="form-control" onChange={this.handleChange} name='category'>
                        {
                            categories.map(option => <option value={`${option}`}
                                                             key={`${option}`}>{`${option}`}</option>)
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Condition</label>
                    <select className="form-control" onChange={this.handleChange} name='condition'>
                        {
                            conditions.map(option => <option value={`${option}`}
                                                             key={`${option}`}>{`${option}`}</option>)
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>
                        Description
                        <textarea className="form-control" rows="4" onChange={this.handleChange}
                                  name='description'/>
                    </label></div>
                <div className="form-group">
                    <label>Image
                        <input className="form-control-file" type="file"/>
                    </label></div>
                <div className="form-check">
                    <input type="checkbox" checked="checked" className="form-check-input" name=''
                           onChange={this.handleChange}/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Available</label>
                </div>
                <button type="submit" className="btn btn-primary mb-2" value='submit'>Submit</button>
            </form>
        );
    }
}