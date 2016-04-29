import React from 'react';
import {connect} from 'react-redux';
import {tr} from '../../lib/Utils'
import {sendCommand,getVersion,addOutputCooked,sendLogCommand} from '../../actions/AppActions.jsx';
class RapCommand extends React.Component {
    constructor(props) {
        super(props);
        this.arrButtons = [
            {name: 'rap deploy -s', id: 0},
            {name: '---'},
            {name: 'rap log', id: 1},{name: 'rap scan', id: 9},{name: 'rap layout --visual', id: 2},
            {name: '---'},
            {name: 'rap deploy', id: 8},{name: 'rap layout', id: 5},
            {name: 'rap start', id: 6},
            {name: 'rap stop', id: 7}, {name: 'rap version', id: 3}
        ];
        // {name: 'rap system info', id: 4},
        //按钮的id对应的说明文字
        this.arrInfos = {0: 70, 1: 71, 2: 72, 3: 73, 4: 74, 5: 75, 6: 76, 7: 77,8:78,9:79}
        this.idxInterval = 0;
    }

    executeCommand(e) {
        var value = e.target.innerHTML;
        // console.log('projectPath',this.props.projectPath)
        var projectPath = this.props.projectPath;
        if (!projectPath) {
            addOutputCooked(tr(210), true);//请先打开 ruff 项目
        } else {
            switch (value) {
                case "rap log"://启动log
                    sendLogCommand(projectPath)
                    break;
                default:
                    sendCommand(value, null, projectPath)
                    break;
            }
        }
    }

    showInfo(e) {
        clearInterval(this.idxInterval)
        var tip = document.getElementById('tip');
        tip.className = 'info-show';
        tip.style.left = '160px';
        var top = e.target.getBoundingClientRect().top;
        //console.log('top:', e.target.getBoundingClientRect().top)
        tip.style.top = top + 'px';
        var id = e.target.id;
        document.getElementById('tipContent').innerHTML = tr(this.arrInfos[id]);
    }

    hideInfo(e) {
        this.idxInterval = setInterval(()=> {
            var tip = document.getElementById('tip');
            if (tip) {
                tip.className = 'info-hide';
            }
        }, 100);
    }

    render() {
        var self = this;
        //console.log(121321,<pageCmd></pageCmd>)
        //console.log(123,this.props.config)
        //console.log('render')
        //tr--0--Rap 命令
        var getCommands = this.arrButtons.map(function (item, index) {
            var style = {width: '100%', margin: '0 0 3px 0'}
            switch (item.name) {
                case "rap version":
                    return <button key={'cmd'+item.id} id={item.id} onMouseOver={self.showInfo.bind(self)}
                                   onMouseOut={self.hideInfo.bind(self)} className="btnBlue" style={style}
                                   onClick={getVersion}>{item.name}</button>
                case "---":
                    return<div key={'cmd9999'+index} style={{textAlign:'center'}}>--------------------------</div>
                default:
                    return <button key={'cmd'+item.id} id={item.id} onMouseOver={self.showInfo.bind(self)}
                                   onMouseOut={self.hideInfo.bind(self)} className="btnBlue" style={style}
                                   onClick={self.executeCommand.bind(self)}>{item.name}</button>
            }
        })
        return (
            <div style={{margin:'-12px -12px -12px -12px'}}>
                <div id="tip" className="info-hide">
                    <div className="arrow"/>
                    <div id="tipContent"/>
                </div>
                {getCommands}
            </div>
        )
    }
}
//<button className="btnBlue" style={style} onClick={this.executeCommand.bind(this)}>rap deploy -s</button>
//<button className="btnBlue" style={style} onClick={this.executeCommand.bind(this)}>rap log</button>
//<button className="btnBlue" style={style} onClick={this.executeCommand.bind(this)}>rap layout --visual</button>
//<button className="btnBlue" style={style} onClick={getVersion}>rap version</button>
//<button className="btnBlue" style={style} onClick={this.executeCommand.bind(this)}>rap system info</button>
function select(state) {
    return {
        projectPath: state.config.projectPath
    }
}
export default connect(select)(RapCommand);
