import {createContainer, goPath} from "@/util";
import Component from './Component';
import TaskService from '@/service/TaskService';
import {message} from 'antd';

message.config({
    top: 100
})


export default createContainer(Component, (state)=>{
    return {
        is_admin: state.user.is_admin
    };
}, ()=>{
    const taskService = new TaskService();

    return {
        async createTask(formData, st){
            try {
                const rs = await taskService.create({
                    name: formData.taskName,
                    category: formData.taskCategory,
                    type: formData.taskType,
                    description: formData.taskDesc,
                    thumbnail: st.upload_url,

                    candidateLimit: formData.taskCandLimit,
                    candidateSltLimit: formData.taskCandSltLimit,

                    rewardUpfront: {
                        ela: formData.taskCandSltLimit * 1000,
                        elaDisbursed: 0
                    },
                    reward: {
                        ela: formData.taskCandSltLimit * 1000,
                        elaDisbursed: 0,
                        votePower: parseFloat(formData.taskCandSltLimit) * 100
                    }
                });

                if (rs) {
                    message.success('task created successfully');
                    taskService.path.push(`/task/${rs._id}`);
                }
            } catch (err) {
                // message.error('There was an error creating this task')
                message.error(err.message) // TODO: add rollbar?
            }
        }
    };
});
