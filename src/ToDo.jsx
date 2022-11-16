import React from "react";
import {
    ListItem,
    ListItemText,
    InputBase,
    Checkbox, ListItemSecondaryAction,
    IconButton
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";


class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item, readOnly: true };
        this.delete = props.delete;
    }

    //삭제 실행
    deleteEventHandler = (e) => {
        this.delete(this.state.item);
    }

    //
    offReadOnlyMode = (e) => {
        console.log("Event!", this.state.readOnly);
        this.setState({ readOnly: false });
    };

    enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            this.setState({ readOnly: true });
            this.update(this.state.item);
        }
    };

    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
    };

    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState({ item: thisItem });
        this.update(this.state.item);
    };
    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox checked={item.done} onChange={this.checkboxEventHandler} />
                <ListItemText>
                    <InputBase inputProps={{ "aria-label": "naked", readOnly: this.state.readOnly }}
                        type="text"
                        id={item.id}
                        name={item.id}
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
                        /* 할 일을 눌렀을 때 ReadOnly 모드 해제 */
                        onClick={this.offReadOnlyMode}
                        /* 바꿀때 똑같이 수정되도록 설정*/
                        onChange={this.editEventHandler}
                        /* 입력할때 이벤트 발생*/
                        onKeyPress={this.enterKeyEventHandler}
                    >
                    </InputBase>
                </ListItemText>

                {/*삭제 버튼 추가*/}
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete Todo" onClick={this.deleteEventHandler}>
                        <DeleteOutlined></DeleteOutlined>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default ToDo;