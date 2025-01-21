import React, { useState, useEffect } from 'react';
import { ScrollView, View } from "react-native";
import { Button, H4, H5 } from "tamagui";
import { router } from 'expo-router';
import { TextInputMask } from 'react-native-masked-text';
import * as SecureStore from 'expo-secure-store';
import axiosInstance from '../config/axiosUrlConfig';

export default function addCreditUser() {
  const [numeroCartao, setNumeroCartao] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  const [tipoCartao, setTipoCartao] = useState("CREDIT_CARD");
  const [cvv, setCvv] = useState("");
  const [clienteId, setClienteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientId = async () => {
      const email = await SecureStore.getItemAsync('email');
      if (!email) {
        router.push('/'); // Redireciona se não estiver logado
        return;
      }
      try {
        const response = await axiosInstance.get('/api/cliente');
        const clienteData = response.data.find((cliente: any) => cliente.email === email);
        setClienteId(clienteData?.id || null);
      } catch (e) {
        console.error('Erro ao buscar ID do cliente:', e);
      }
    };

    fetchClientId();
  }, []);

  const apiRegisterNewCard = async () => {
    if (!clienteId) {
      alert('Cliente não encontrado. Faça login novamente.');
      return;
    }

    const registerRequestData = {
      numeroCartao,
      tipoCartao,
      dataVencimento,
      cvv,
    };

    try {
      await axiosInstance.post(`/api/cliente/cartao/${clienteId}`, registerRequestData);
      alert("Cartão registrado com sucesso!");
      router.push('/(logged-user)/Home');
    } catch (e) {
      alert('Erro ao registrar o cartão: ' + e);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ marginTop: 20, padding: 16 }}>
          <H4 style={{ textAlign: "center" }}>Registrar novo cartão</H4>

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

            <Button onPress={apiRegisterNewCard}>
              Registrar novo cartão
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
