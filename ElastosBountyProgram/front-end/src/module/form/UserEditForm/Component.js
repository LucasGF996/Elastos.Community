import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {
    Form,
    Icon,
    Input,
    InputNumber,
    Button,
    Checkbox,
    Select,
    message,
    Row,
    Col,
    Upload,
    Cascader,
    Divider

} from 'antd'

import config from '@/config'

import {upload_file} from "@/util";
import './style.scss'

import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS} from '@/constant'

const FormItem = Form.Item
const TextArea = Input.TextArea

/**
 * This is generic task create form for both Developer and Social Bounties / Events
 *
 * Which version of the form depends on the leader's program
 *
 * Leaders - can create:
 * - Events (offline) restricted to their area - must be approved
 * - Events (online) anywhere - Social or Developer
 *
 * TODO: in the future we should developer leaders
 *
 * Community Leaders - each community has a leader
 * - a leader can create events in their own local community or online community
 * - local offline events are automatically shown in their local community, a country leader
 *  can create events in any child community
 * - these events are shown in the Social page as well
 * - a local event can have sub tasks, these are shown as tasks in the Social page
 */
class C extends BaseComponent {
    state = {
        communityTrees: []
    }

    handleSubmit (e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.updateUser(values, this.state).then(() => {
                    this.props.getCurrentUser()
                });
                this.props.switchEditMode()
            }
        })
    }

    getInputProps () {

        const {getFieldDecorator} = this.props.form
        const user = this.props.user

        const username_fn = getFieldDecorator('username', {
            rules: [{required: true, message: 'Username is required'}],
            initialValue: user.username
        })
        const username_el = (
            <Input size="large"/>
        )

        const email_fn = getFieldDecorator('email', {
            rules: [{required: true, message: 'Email is required'}],
            initialValue: user.email
        })
        const email_el = (
            <Input size="large"/>
        )

        const firstName_fn = getFieldDecorator('firstName', {
            rules: [{required: true, message: 'First name is required'}],
            initialValue: user.profile.firstName
        })
        const firstName_el = (
            <Input size="large"/>
        )

        const lastName_fn = getFieldDecorator('lastName', {
            rules: [{required: true, message: 'Last name is required'}],
            initialValue: user.profile.lastName
        })
        const lastName_el = (
            <Input size="large"/>
        )

        const country_fn = getFieldDecorator('country', {
            rules: [{required: true, message: 'Please select your country'}],
            initialValue: user.profile.country
        })
        const country_el = (
            <Select size="large"
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    placeholder="Country">
                {_.entries(config.data.mappingCountryCodeToName).map(([key, val]) => {
                    return <Select.Option key={key} value={key}>
                        {val}
                    </Select.Option>
                })}
            </Select>
        )

        const state_fn = getFieldDecorator('state')
        const state_el = (
            <Input size="large"
                   placeholder="State/Province"/>
        )

        const city_fn = getFieldDecorator('city')
        const city_el = (
            <Input size="large"
                   placeholder="City"/>
        )

        const organizer_fn = getFieldDecorator('beOrganizer', {
            rules: [{message: 'Please select an option'}]
        })
        const organizer_el = (
            <Select size="large"
                    placeholder="Do you want to be an organizer?">
                <Select.Option value="yes">Yes</Select.Option>
                <Select.Option value="no">No</Select.Option>
            </Select>
        )

        const developer_fn = getFieldDecorator('isDeveloper', {
            rules: [{message: 'Please select an option'}]
        })
        const developer_el = (
            <Select size="large"
                    placeholder="Are you a software developer or engineer?">
                <Select.Option value="yes">Yes</Select.Option>
                <Select.Option value="no">No</Select.Option>
            </Select>
        )

        return {
            username: username_fn(username_el),
            email: email_fn(email_el),

            firstName: firstName_fn(firstName_el),
            lastName: lastName_fn(lastName_el),
            country: country_fn(country_el),

            state: state_fn(state_el),
            city: city_fn(city_el),
            organizer: organizer_fn(organizer_el),
            developer: developer_fn(developer_el)
        }
    }

    componentDidMount() {

    }

    ord_render () {
        const {getFieldDecorator} = this.props.form
        const p = this.getInputProps()

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        }

        // const existingTask = this.props.existingTask

        // TODO: terms of service checkbox

        // TODO: react-motion animate slide left

        // TODO: description CKE Editor

        return (
            <div className="c_userEditFormContainer">

                <Form onSubmit={this.handleSubmit.bind(this)} className="d_taskCreateForm">
                    <div>
                        <FormItem label="Username" {...formItemLayout}>
                            {p.username}
                        </FormItem>
                        <FormItem label="Email" {...formItemLayout}>
                            {p.email}
                        </FormItem>
                        <FormItem label="First Name" {...formItemLayout}>
                            {p.firstName}
                        </FormItem>
                        <FormItem label="Last Name" {...formItemLayout}>
                            {p.lastName}
                        </FormItem>
                        <FormItem label="Country" {...formItemLayout}>
                            {p.country}
                        </FormItem>
                        <FormItem label="State/Province" {...formItemLayout}>
                            {p.state}
                        </FormItem>
                        <FormItem label="City" {...formItemLayout}>
                            {p.city}
                        </FormItem>
                        <FormItem label="Do you want to an organizer" {...formItemLayout}>
                            {p.organizer}
                        </FormItem>
                        <FormItem label="Are you a software developer or organizer?" {...formItemLayout}>
                            {p.developer}
                        </FormItem>

                        <FormItem wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 12, offset: 8}}}>
                            <Button loading={this.props.loading} type="ebp" htmlType="submit" className="d_btn">
                                Save Changes
                            </Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
        )
    }

}
export default Form.create()(C)
