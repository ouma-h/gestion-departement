import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Font
} from "@react-pdf/renderer";
Font.register({
    family: "Poppins",
    fonts: [
        {
            src:
                "https://fonts.gstatic.com/s/poppins/v1/TDTjCH39JjVycIF24TlO-Q.ttf"
        }
    ]
});

export default function DeliveryFormTemplate({
    deliveryProducts,
    client,
    delivery,
    totals
}) {
    console.log("called3");

    return (
        <Document>
            <Page size="A4" width={900} style={styles.page} wrap>
                <View
                    fixed
                    style={[
                        styles.displayFlexSpaceBetween,
                        { marginVertical: "20px" }
                    ]}
                >
                    <View>
                        <Image
                            source={require("../../../../public/logo.png")}
                            style={{ width: 200, height: 112 }}
                        />
                    </View>
                    <View
                        style={{
                            color: "black",
                            fontSize: 8,
                            alignItems: "flex-end"
                        }}
                    >
                        <Text style={{ fontSize: 10, fontWeight: 700 }}>
                            COEFI
                        </Text>
                        <Text>Adresse: Route el kef, k6, el agbe, Tunis</Text>
                        <Text>Téléphone: 31172800</Text>
                        <Text>Courriel: coefitn@gmail.com</Text>
                        <Text>Matricule Fiscal: 1669897XAM000</Text>
                    </View>
                </View>
                <View
                    fixed
                    style={[
                        styles.displayFlexSpaceBetween,
                        { marginVertical: "20px", alignItems: "baseline" }
                    ]}
                >
                    <View>
                        <Text style={[styles.fontBold, { fontSize: 10 }]}>
                            {"  "}
                            Bon de livraison à l'intention de :
                        </Text>
                        <View style={styles.destinataire}>
                            <Text>Nom Contact: {client.nom}</Text>
                            {client.hasOwnProperty("raison_sociale") ? (
                                <Text>Société: {client.raison_sociale}</Text>
                            ) : null}
                            {client.hasOwnProperty("addresse") ? (
                                <Text>Adresse: {client.addresse}</Text>
                            ) : null}
                            {client.hasOwnProperty("telephone") ? (
                                <Text>Téléphone: {client.telephone}</Text>
                            ) : null}
                            {client.hasOwnProperty("email") ? (
                                <Text>Courriel: {client.email}</Text>
                            ) : null}
                        </View>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                        <Text style={[styles.fontBold, { fontSize: 10 }]}>
                            BON DE LIVRAISON N° {delivery.id}
                        </Text>
                        <Text style={[styles.fontBold, { fontSize: 10 }]}>
                            Date: {delivery.delivery_date}
                        </Text>
                    </View>
                </View>
                <View
                    fixed
                    style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "baseline"
                    }}
                >
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: 700,
                            textAlign: "center"
                        }}
                    >
                        BON DE LIVRAISON
                    </Text>
                    <Text
                        style={{ marginRight: "5px" }}
                        render={({ pageNumber, totalPages }) =>
                            `Page ${pageNumber} / ${totalPages}`
                        }
                        fixed
                    />
                </View>
                <View
                    fixed
                    style={{
                        borderBottomColor: "gray",
                        borderBottomWidth: 3,
                        marginVertical: 15,
                        marginHorizontal: 8
                    }}
                />
                <View>
                    <View style={styles.tableRow} fixed>
                        <View
                            style={[
                                styles.tableCol,
                                ,
                                styles.tableHeader,
                                { width: "35%" }
                            ]}
                        >
                            <Text style={styles.tableCell}>Désignation</Text>
                        </View>
                        <View style={[styles.tableCol, styles.tableHeader]}>
                            <Text style={styles.tableCell}>Q. Livrée</Text>
                        </View>
                        <View style={[styles.tableCol, styles.tableHeader]}>
                            <Text style={styles.tableCell}>Unité</Text>
                        </View>
                        <View style={[styles.tableCol, styles.tableHeader]}>
                            <Text style={styles.tableCell}>PU HT</Text>
                        </View>
                        <View style={[styles.tableCol, styles.tableHeader]}>
                            <Text style={styles.tableCell}>Remise%</Text>
                        </View>
                        <View style={[styles.tableCol, styles.tableHeader]}>
                            <Text style={styles.tableCell}>Total HT</Text>
                        </View>
                    </View>
                    {deliveryProducts.map((item, index) => {
                        return (
                            <View
                                style={styles.tableRow}
                                key={index}
                                wrap={false}
                            >
                                <View
                                    style={[styles.tableCol, { width: "35%" }]}
                                >
                                    <Text style={styles.tableCell}>
                                        {item.designation}
                                    </Text>
                                </View>

                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {item.pivot.delivered_quantity}
                                    </Text>
                                </View>

                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {item.unit}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {parseFloat(item.prix).toFixed(3)}
                                    </Text>
                                </View>

                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {item.pivot.remise
                                            ? item.pivot.remise
                                            : "-"}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {(
                                            (item.prix -
                                                (item.prix *
                                                    item.pivot.remise) /
                                                    100) *
                                            item.pivot.delivered_quantity
                                        ).toFixed(3)}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>

                <View
                    wrap={false}
                    style={{
                        marginLeft: "auto",
                        marginRight: "10px",
                        width: "auto",
                        marginVertical: "10px",
                        display: "table"
                    }}
                >
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Total HT</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                                {parseFloat(totals.totalHT).toFixed(3)} DT
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>TVA</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                                {parseFloat(totals.tva).toFixed(3)} DT
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, styles.tableHeader]}>
                            <Text style={styles.tableCell}>TOTAL TTC</Text>
                        </View>
                        <View style={[styles.tableCol, styles.tableHeader]}>
                            <Text style={styles.tableCell}>
                                {(
                                    parseFloat(totals.tva) +
                                    parseFloat(totals.totalHT)
                                ).toFixed(3)}{" "}
                                DT
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        borderBottomColor: "gray",
                        borderBottomWidth: 3,
                        marginVertical: 15,
                        marginHorizontal: 8
                    }}
                />
                <View
                    style={{
                        marginHorizontal: 8
                    }}
                >
                    <Text>Commentaire:</Text>
                    <Text>{delivery.comment}</Text>
                </View>
                <View
                    fixed
                    style={{
                        borderBottomColor: "gray",
                        borderBottomWidth: 3,
                        marginVertical: 15,
                        marginHorizontal: 8
                    }}
                />
            </Page>
        </Document>
    );
}

const styles = StyleSheet.create({
    destinataire: {
        backgroundColor: "grey",
        padding: "15px",
        color: "white",
        borderRadius: 8,
        fontSize: 8
    },
    page: {
        fontFamily: "Poppins",
        fontSize: 9.5,
        paddingHorizontal: "10px"
    },
    displayFlexSpaceBetween: {
        paddingHorizontal: "20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    table: {
        marginVertical: "20px",
        padding: "20px",
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1
    },
    tableRow: { margin: "auto", flexDirection: "row" },
    tableCol: {
        width: "13%",
        borderStyle: "solid",
        borderWidth: 1
    },
    tableCell: { margin: "auto", marginTop: 5, padding: 5, fontSize: 8.5 },
    footer: {
        fontFamily: "Poppins",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        width: "auto",
        textAlign: "center",
        fontSize: 8,
        margin: 10
    },
    tableHeader: {
        backgroundColor: "gray",
        color: "white"
    }
});
