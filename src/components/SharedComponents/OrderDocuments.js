import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle
} from "react";
import ReactLoading from "./ReactLoading";

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Table
} from "reactstrap";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import FactureFormTemplate from "./FactureFormTemplate";

import { Link } from "react-router-dom";
import { FaEye, FaDownload } from "react-icons/fa";

const OrderDocuments = forwardRef(({ docs, client, order }, ref) => {
    const [value, setValue] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const [totalHT, setTotalHT] = useState(0);
    const [TVA, setTVA] = useState(0);

    const showModal = () => {
        setValue(true);
    };

    const hideModal = () => {
        setValue(false);
    };

    useImperativeHandle(ref, () => {
        return {
            showOrderDocuments: showModal
        };
    });
    const generateFacturePdf = async (facture, tva, totalht) => {
        const factureDoc = FactureFormTemplate({
            orderProducts: facture.order.products,
            client:
                order.etat == "caisse" ? { nom: order.beneficiary } : client,
            facture: {
                id: facture.invoice_no,
                received_payment: facture.received_payment,
                mode: facture.mode
            },
            type: order.etat,
            totals: { totalHt: totalht, tva: tva },
            solde: facture.solde
        });
        const blob = await pdf(factureDoc).toBlob();
        saveAs(blob, `facture_${facture.id}.pdf`);
    };

    const generateDevisPdf = async (devis, tva, totalht) => {
      const devisDoc = FactureFormTemplate({
          orderProducts: facture.order.products,
          client:
              order.etat == "caisse" ? { nom: order.beneficiary } : client,
          devis: {
              id: devis.id,
              received_payment: facture.received_payment,
              mode: facture.mode
          },
          totals: { totalHt: totalht, tva: tva },
          solde: facture.solde
      });
      const blob = await pdf(devisDoc).toBlob();
      saveAs(blob, `facture_${devis.id}.pdf`);
  };

    const calculTotals = (products, facture) => {
        var totalht = 0;
        var tva = 0;
        products.map((item, index) => {
            let total = item.pivot.quantite * item.prix;
            if (item.pivot.remise) {
                total -= (total * item.pivot.remise) / 100;
            }
            totalht += parseFloat(parseFloat(total).toFixed(3));
            tva += parseFloat(
                parseFloat(
                    (total * 0.19)
                ).toFixed(3)
            );
        });
        setTVA(tva);
        setTotalHT(totalht);
        generateFacturePdf(facture, tva, totalht);
    };

    useEffect(() => {
        if (docs) {
            setIsLoaded(true);
        }
    }, [docs]);
    return (
        <>
            <Modal
                isOpen={value}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                autoFocus={true}
            >
                <ModalHeader toggle={hideModal}>Document(s) Lié(s)</ModalHeader>

                <ModalBody>
                    {isLoaded ? (
                        docs.payments != undefined ||
                        docs.deliveries != undefined ? (
                            docs.payments.length || docs.deliveries.length ? (
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>N°</th>
                                            <th>Date</th>
                                            <th>etat</th>
                                            <th>Télécharger</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {docs.deliveries != undefined
                                            ? docs.deliveries.map(
                                                  (item, index) => {
                                                      return (
                                                          <tr key={index}>
                                                              <td>
                                                                  Bon de
                                                                  livraison
                                                              </td>
                                                              <td>{item.id}</td>
                                                              <td>
                                                                  {
                                                                      item.delivery_date
                                                                  }
                                                              </td>
                                                              <td>
                                                                  {item.etat}
                                                              </td>
                                                              <td
                                                                  style={{
                                                                      textAlign:
                                                                          "center"
                                                                  }}
                                                              >
                                                                  <Link
                                                                      to={{
                                                                          pathname:
                                                                              "/bon_de_livraison",
                                                                          state: {
                                                                              id:
                                                                                  item.id
                                                                          }
                                                                      }}
                                                                  >
                                                                      <FaEye
                                                                          size="25px"
                                                                          color="green"
                                                                      />
                                                                  </Link>
                                                              </td>
                                                          </tr>
                                                      );
                                                  }
                                              )
                                            : null}
                                        {docs.payments != undefined
                                            ? docs.payments.map(
                                                  (bill, index) => {
                                                      if (
                                                          !bill.planned_payment &&
                                                          bill.received_payment
                                                      ) {
                                                          return (
                                                              <tr key={index}>
                                                                  <td>
                                                                      Facture
                                                                  </td>
                                                                  <td>
                                                                      {bill.id}
                                                                  </td>
                                                                  <td>
                                                                      {
                                                                          bill.received_payment
                                                                      }
                                                                  </td>
                                                                  <td>---</td>
                                                                  <td
                                                                      style={{
                                                                          textAlign:
                                                                              "center"
                                                                      }}
                                                                      onClick={() => {
                                                                          calculTotals(
                                                                              bill
                                                                                  .order
                                                                                  .products,
                                                                              bill
                                                                          );
                                                                          setProducts(
                                                                              bill
                                                                                  .order
                                                                                  .products
                                                                          );
                                                                      }}
                                                                  >
                                                                      <FaDownload
                                                                          size="15px"
                                                                          className="grow"
                                                                      />
                                                                  </td>
                                                              </tr>
                                                          );
                                                      }
                                                  }
                                              )
                                            : null}
                                    </tbody>
                                </Table>
                            ) : (
                                <div className="div-no-element-added">
                                    Aucun document lié
                                </div>
                            )
                        ) : null
                    ) : (
                        <ReactLoading />
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-danger" onClick={hideModal}>
                        Fermer
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
});
export default OrderDocuments;
