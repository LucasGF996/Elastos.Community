import React from 'react'
import StandardPage from '../../StandardPage'
import I18N from '@/I18N'
import './style.scss'
import { Col, Row, Card, Button, Breadcrumb, Icon, List, Spin, Avatar, Modal } from 'antd'
import _ from 'lodash'

export default class extends StandardPage {
    ord_renderContent(){
        return (
            <div className="p_council">
                <div className="ebp-header-divider"></div>
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_content">
                            {this.renderList()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    renderList(){
        const listData = this.getListData();
        const p_list = {
            itemLayout : 'horizontal',
            // size : 'small',
            // pageSize : 10,
            dataSource : listData,
            header : (<h2 style={{padding:0}}>{I18N.get('council.0002')}</h2>)
            // renderItem : ()=>{

            // }
        };

        return (
            <div className="d_list">
            
                <List {...p_list} renderItem={item => (
                    <List.Item key={item.title} >
                        <List.Item.Meta
                        title={<a href={`/council/detail/${item.id}`} className="f_h4">#{item.id} - {item.title}</a>}
                        description={item.description}
                         />
                        <div style={{position:'relative',top:20}}>{item.date}</div>
                    </List.Item>
                    )}
                /> 

                <h4 style={{marginTop:24}}>Any suggestions, proposals can be sent to <a href="mailto:council@cyberrepublic.org">council@cyberrepublic.org</a></h4>
            </div>
        );
    }
    getListData(){
        return [
            {
                id : '1',
                title : I18N.get('council.list.1'),
                description : I18N.get('council.desc.1'),
                date : '09/13/2018'
            },
            {
                id : '2',
                title : I18N.get('council.list.2'),
                description : I18N.get('council.desc.2'),
                date : '09/13/2018'
            },
            {
                id : '3',
                title : I18N.get('council.list.3'),
                description : I18N.get('council.desc.3'),
                date : '09/13/2018'
            },
            {
                id : '4',
                title : I18N.get('council.list.4'),
                description : I18N.get('council.desc.4'),
                date : '09/13/2018'
            },
            {
                id : '5',
                title : I18N.get('council.list.5'),
                description : I18N.get('council.desc.5'),
                date : '09/13/2018'
            }
        ];
    }
}
