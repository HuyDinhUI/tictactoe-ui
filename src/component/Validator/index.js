import HandleValidator from "./HandleValidation"
import { Component } from "react"

class Validator extends Component{
    constructor (props){
        super(props)
        this.state={
            name:'',
            email:'',
            errors:{}
        }
        const requireWith = (value,field,state)=>(!state[field] && !value) || !!value
        const rules = [
            {
                field:'name',
                method:'isEmpty',
                validWhen: false,
                message:'The name field is required'
            },
            {
                field:'eamil',
                method:'isEmpty',
                validWhen: true,
                message:'The email fied is required'
            },
            {
                field:'eamil',
                method:'isEmail',
                validWhen: true,
                message:'The email must be a valid email address'
            },
            {
                field:'old',
                method:'isEmpty',
                validWhen: false,
                message:'The old field is required'
            },
            {
                field:'gender',
                method:'isEmpty',
                validWhen: false,
                message:'The gender field is required'
            }
        ]
        this.validator = new HandleValidator(rules)
    }

    handleInput = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.setState({
            errors:this.validator.validate(this.state)
        })
        console.log(this.state)
    }
}  

export default Validator