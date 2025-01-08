import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image } from "react-native";
import { Button, H4, H5, Input, Text } from "tamagui";
import { Picker } from "@react-native-picker/picker";
import axiosInstance from '../config/axiosUrlConfig';
import { router } from 'expo-router';
import { TextInputMask } from 'react-native-masked-text';




export default function addCreditUser() {
  const [numeroCartao, setNumeroCartao] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  // const [nomeTitular, setNomeTitular] = useState("");
  const [tipoCartao, setTipoCartao] = useState("CREDIT_CARD");
  const [cvv, setCvv] = useState("");
  const clienteId = "1";  // ID fixo do cliente para fins de teste




  const apiRegisterNewCard = async () => {
    const registerRequestData = {
      numeroCartao,
      tipoCartao,
      dataVencimento,
      cvv,
    }
    console.log(registerRequestData)
    try {
      await axiosInstance.post(`/api/cliente/cartao/${clienteId}`, registerRequestData).then((response) => {
        console.log(response)
      })
    }
    catch (e) {
      alert(e)
    }
    alert("Cartão registrado com sucesso!");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ marginTop: 20, padding: 16 }}>
          <H4 style={{ textAlign: "center" }}>Registrar novo cartão</H4>
          {/* <Image
            style={{ width: 80, height: 80, alignSelf: "center", marginTop: 10 }}
            source={require("../assets/images/icon.png")}
          /> */}

          <View style={{ marginTop: 20 }}>
            <H5>Número do cartão</H5>
            <TextInputMask
              value={numeroCartao}
              onChangeText={setNumeroCartao}
              type={'custom'}
              options={{
                mask: '9999 9999 9999 9999',
              }}
              placeholder="Digite o número do cartão"
              style={{ marginBottom: 16 }}
            />

            <H5>Data de validade</H5>
            <TextInputMask
              value={dataVencimento}
              onChangeText={setDataVencimento}
              type={'custom'}
              options={{
                mask: '99/9999',
              }}

              placeholder="MM/AA"
              style={{ marginBottom: 16 }}
            />

            {/* <H5>Nome do titular</H5>
            <Input
              value={nomeTitular}
              onChangeText={setNomeTitular}
              placeholder="Nome impresso no cartão"
              style={{ marginBottom: 16 }}
            /> */}

            <H5>CVV</H5>
            <TextInputMask
              value={cvv}
              onChangeText={setCvv}
              type={'custom'}
              options={{
                mask: '999',
              }}
              placeholder="Código de segurança"
              style={{ marginBottom: 16 }}
            />


            <Button onPress={() => { apiRegisterNewCard(); router.push('/(logged-user)/Home') }} >
              Registrar novo cartão
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
