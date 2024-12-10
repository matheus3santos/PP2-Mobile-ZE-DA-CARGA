import React, { useState } from "react";
import { ScrollView, View, Image } from "react-native";
import { Button, H4, H5, Input, Text } from "tamagui";
import { Picker } from "@react-native-picker/picker";

export default function addDebitUser() {
  const [numeroCartao, setNumeroCartao] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [nomeTitular, setNomeTitular] = useState("");
  const [cvv, setCvv] = useState("");
  const [cepCobranca, setCepCobranca] = useState("");
  const [estadoCobranca, setEstadoCobranca] = useState("");
  const [cidadeCobranca, setCidadeCobranca] = useState("");
  const [enderecoCobranca, setEnderecoCobranca] = useState("");

  const consultarCEP = () => {
    // Valores mockados
    console.log("Consultando CEP:", cepCobranca);
    setEstadoCobranca("SP");
    setCidadeCobranca("São Paulo");
    setEnderecoCobranca("Rua Fictícia, 123");
  };

  const apiRegisterNewCard = () => {
    console.log("Novo cartão registrado:", {
      numeroCartao,
      dataValidade,
      nomeTitular,
      cvv,
      cepCobranca,
      estadoCobranca,
      cidadeCobranca,
      enderecoCobranca,
    });
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
            <Input
              value={numeroCartao}
              onChangeText={setNumeroCartao}
              placeholder="Digite o número do cartão"
              style={{ marginBottom: 16 }}
            />

            <H5>Data de validade</H5>
            <Input
              value={dataValidade}
              onChangeText={setDataValidade}
              placeholder="MM/AA"
              style={{ marginBottom: 16 }}
            />

            <H5>Nome do titular</H5>
            <Input
              value={nomeTitular}
              onChangeText={setNomeTitular}
              placeholder="Nome impresso no cartão"
              style={{ marginBottom: 16 }}
            />

            <H5>CVV</H5>
            <Input
              value={cvv}
              onChangeText={setCvv}
              placeholder="Código de segurança"
              style={{ marginBottom: 16 }}
            />

            <H5>CEP de cobrança</H5>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
              <Input
                value={cepCobranca}
                onChangeText={setCepCobranca}
                placeholder="Digite o CEP"
                style={{ flex: 1 }}
              />
              <Button onPress={consultarCEP} style={{ marginLeft: 8 }}>
                Consultar
              </Button>
            </View>

            <H5>Estado de cobrança</H5>
            <Picker
              selectedValue={estadoCobranca}
              onValueChange={setEstadoCobranca}
              style={{
                borderWidth: 1,
                borderRadius: 8,
                borderColor: "gray",
                marginBottom: 16,
              }}
            >
              <Picker.Item label="Selecione um estado" value="" />
              <Picker.Item label="São Paulo" value="SP" />
              <Picker.Item label="Rio de Janeiro" value="RJ" />
              {/* Adicione mais estados se necessário */}
            </Picker>

            <H5>Cidade de cobrança</H5>
            <Input
              value={cidadeCobranca}
              onChangeText={setCidadeCobranca}
              placeholder="Cidade"
              style={{ marginBottom: 16 }}
            />

            <H5>Endereço de cobrança</H5>
            <Input
              value={enderecoCobranca}
              onChangeText={setEnderecoCobranca}
              placeholder="Endereço"
              style={{ marginBottom: 16 }}
            />

            <Button onPress={apiRegisterNewCard}>
              Registrar novo cartão
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
