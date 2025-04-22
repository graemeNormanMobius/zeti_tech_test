import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import bobsLogo from '../../assets/clientLogos/bobs.png'
import { Vehicle } from "../../models/models.tsx";
import { getTodayAsISODate } from "../../utils/utils.tsx";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    section: {
        marginBottom: 10,
    },
    image: {
        height: 100,
        width: 100
    },
    table: {
        // display: 'table',
        width: 'auto',
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '33.33%',
        fontWeight: 'bold',
        borderBottom: '1 solid black',
        padding: 5,
    },
    tableCol: {
        width: '33.33%',
        padding: 5,
    },
    total: {
        textAlign: 'right',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    },
});

export function MyDocument({ invoiceData, invoiceTotal } : { invoiceData: Vehicle[], invoiceTotal: number }) {
    const invoiceDate = getTodayAsISODate();

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image
                    style={styles.image}
                    src={bobsLogo}
                />
                <View style={styles.header}>
                    <Text style={styles.title}>Monthly Invoice</Text>
                    <Text>Invoice #53</Text>
                    <Text>Date: {invoiceDate}</Text>
                </View>

                <View style={styles.section}>
                    <Text>Bill To:</Text>
                    <Text>Bob's Taxi, 264 Long Riding, Basildon SS14 1RS</Text>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>Vehicle</Text>
                        <Text style={styles.tableColHeader}>Total cost for month</Text>
                        <Text style={styles.tableColHeader}>Total miles for month</Text>
                    </View>
                    {invoiceData.map((vehicle: Vehicle, index: number) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCol}>{vehicle.licensePlate} ({vehicle.make}, {vehicle.model})</Text>
                            <Text style={styles.tableCol}>&pound;{vehicle.state.costThisCalendarMonth?.toFixed(2)}</Text>
                            <Text style={styles.tableCol}>{vehicle.state.milesThisCalendarMonth}</Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.total}>
                    Total: &pound;{invoiceTotal.toFixed(2)}
                </Text>
            </Page>
        </Document>
    )
}
