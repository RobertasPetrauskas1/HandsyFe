import { Container } from "react-bootstrap";
import Item from "./Item";

export default function ItemList(props) {
    if (props.items.length === 0) {
        return (
            <div className="mb-3 p-3 item-card">
                There are currently no items.
            </div>
        )
    } else {
        return props.items.map((item) => {
            return (
                <Container key={item.id}>
                    <Item
                        item={item}
                        key={item.id}
                        user_id={props.user_id}
                        group_id={props.group_id}
                        setItems={props.setItems}
                        show_actions={props.show_actions}
                        setAlertVariant={props.setAlertVariant}
                        setAlertHeading={props.setAlertHeading}
                        setAlertMsg={props.setAlertMsg}
                        setShowAlert={props.setShowAlert}
                    />
                </Container>
            );
        })
    }
}