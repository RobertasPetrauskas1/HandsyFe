import { Container } from "react-bootstrap";
import Group from "./Group";

export default function GroupList(props) {
    if (props.groups.length === 0) {
        return (
            <div className="mb-3 p-3 group-card">
                There are currently no groups.
            </div>
        )
    } else {
        return props.groups.map((group) => {
            return (
                <Container key={group.id}>
                    <Group
                        setGroups={props.setGroups}
                        group={group}
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