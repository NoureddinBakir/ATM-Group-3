import { Table } from '@nextui-org/react';

export default function accdetails() {
    const columns = [
        {
            key: "name",
            label: "Account Name",
        },
        {
            key: "balance",
            label: "Balance",
        },
        {
            key: "status",
            label: "STATUS",
        },
    ];
    const rows = [
        {
            key: "1",
            name: "Checking Account",
            balance: "$1,295.39",
            status: "Active",
        },
        {
            key: "2",
            name: "Savings Account",
            balance: "$0.01",
            status: "Paused",
        },
        {
            key: "3",
            name: "Checking Account",
            balance: "$27.34",
            status: "Active",
        },
        {
            key: "4",
            name: "Savings Account",
            balance: "$1,000.01",
            status: "Vacation",
        },
    ];
    return (
        <Table
            aria-label="Example table with dynamic content"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
        >
            <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column key={column.key}>{column.label}</Table.Column>
                )}
            </Table.Header>
            <Table.Body items={rows}>
                {(item) => (
                    <Table.Row key={item.key}>
                        {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}
