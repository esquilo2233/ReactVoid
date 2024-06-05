import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton: React.FC = () => {
  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  if (!clientId) {
    console.error('Client ID do PayPal não definido nas variáveis de ambiente.');
    return null;
  }

  return (   
    <PayPalScriptProvider options={{ clientId }}>
      <PayPalButtons
       style={{
        shape: "rect",
        layout: "vertical",
        color: "gold",
        label: "paypal",
      }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE", // Definindo a intenção de captura
            purchase_units: [{
              amount: {
                currency_code: "EUR", // Definindo o código da moeda
                value: "0.01", // Valor da transação
              },
            }],
          });
        }}
        onApprove={(data, actions) => {
          // Verifica se actions.order está definido antes de chamar capture()
          if (actions.order) {
            return actions.order.capture().then((details) => {
              const payerName = details?.payer?.name?.given_name || 'Desconhecido';
              alert("Transação concluída por " + payerName);
            });
          } else {
            return Promise.reject(new Error('actions.order não está definido.'));
          }
        }}
        onError={(err) => {
          console.error("Erro durante a transação", err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
