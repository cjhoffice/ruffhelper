/**新建一个rap项目*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {LEFT_CHANGE_CLUMTYPE,command} from '../../actions/AppActions';
class C3_NewProject extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        //初始化渲染执行之后立刻调用
    }
    componentDidUpdate(prevProps) {
        console.log(123123)
        //在组件的更新已经同步到 DOM 中之后立刻被调用
    }
    /**关闭组件*/
    closeEnd() {
        // command(LEFT_CHANGE_CLUMTYPE,{key:this.props.clumId,value:0});
    }
    render() {
        return(
            <div className="mousePointer" onClick={this.closeEnd.bind(this)}>
                C3_NewProject
            </div>
        )
    }
}
function select(state) {
    return {
        osType: state.config.osType
    }
}
export default connect(select)(C3_NewProject);
C3_NewProject.propTypes = {
    clumId:PropTypes.number.isRequired//栏目的id
}