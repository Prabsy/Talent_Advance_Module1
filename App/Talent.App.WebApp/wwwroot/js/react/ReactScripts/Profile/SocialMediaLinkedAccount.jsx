/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);
        const linkedAccounts = props.linkedAccounts ?
            Object.assign({}, this.props.linkedAccounts)
            : {
                linkedIn: "",
                github: ""
            }
        this.state = {
            showEditSection: false,
            linkedAccounts: linkedAccounts
        }
        this.openEdit = this.openEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.openLinkedIn = this.openLinkedIn.bind(this)
        this.openGitHub = this.openGitHub.bind(this)



    }

    componentDidMount() {
       
    }
    openLinkedIn() {
            window.open(`${this.props.linkedAccounts.linkedIn}`, "_blank")
    }
    openGitHub() {
            window.open(`${this.props.linkedAccounts.github}`, "_blank")        

    }
    openEdit() {
        const linkedAccounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            linkedAccounts: linkedAccounts
        })
    }
    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.linkedAccounts)
        data[event.target.name] = event.target.value
        this.setState({
            linkedAccounts: data
        })
        console.log("handlechange link account")
        console.log("This is Social " + this.state.linkedAccounts.linkedIn)
        console.log("This is Social   " + this.state.linkedAccounts.github)
    }
    saveContact() {
        if (this.state.linkedAccounts.linkedIn !== "" && this.state.linkedAccounts.github !== "") {

            const linkedAccounts = Object.assign({}, this.state.linkedAccounts)

            const data = Object.assign({}, this.props.linkedAccounts)
            data.linkedAccounts = linkedAccounts
            console.log("linked accounts:" + this.props.linkedAccounts)

            console.log("This is Social" + data.linkedAccounts.linkedIn)
            console.log("This is Social" + data.linkedAccounts.github)

            this.props.saveProfileData(data)
            this.closeEdit()
        } else {
            TalentUtil.notification.show("Fill all the Blanks", "error", null, null)
        }

    }


    render() {
        console.log(this.state.showEditSection)
        if (this.state.showEditSection === false) {
            return (


                <div>
                    <button class="ui linkedin button" onClick={this.openLinkedIn}>
                        <i class="linkedin icon"></i>
                LinkedIn
                </button>
                    <button class="ui github button" onClick={this.openGitHub}>
                        <i class="github icon"></i>
                GitHub
                </button>

                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>

                </div>


            )
        }
        else {
            return (
                <div className='ui sixteen wide column'>
                    <ChildSingleInput
                        inputType="text"
                        label="LinkedIn"
                        name="linkedIn"
                        value={this.state.linkedAccounts.linkedIn}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Enter your LinkedIn url"
                        errorMessage="Please enter a valid LinkedIn url"
                    />
                    <ChildSingleInput
                        inputType="text"
                        label="GitHub"
                        name="github"     
                        value={this.state.linkedAccounts.github}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Enter your GitHub url"
                        errorMessage="Please enter a valid GitHub url"
                    />
                    <button type="button" className="ui teal button" onClick={this.saveContact} >Save</button>
                    <button type="button" className="ui button" onClick={this.closeEdit} >Cancel</button>
                </div>
            )
        }
        }

}