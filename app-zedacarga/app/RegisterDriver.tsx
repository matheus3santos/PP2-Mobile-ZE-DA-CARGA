import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Input, YStack, Button } from 'tamagui';
import { router } from 'expo-router';
import { TextInputMask } from 'react-native-masked-text';
import axiosInstance from './config/axiosUrlConfig';
import { styles } from '../styles/RegisterDriver.style';


export default function RegisterDriver() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    numeroTelefone: '',
    cpf: '',
    email: '',
    numeroCnh: '',
    bairro: '',
    endereco: '',
    cidade: '',
    estado: '',
    numero: '',
    cep: '',
    complemento: '',
    rendaMensal: '',
    dataNascimento: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentPage < 3) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        nome: formData.nome,
        email: formData.email,
        dataNascimento: formData.dataNascimento,
        numeroTelefone: formData.numeroTelefone,
        cpf: formData.cpf,
        numeroCnh: formData.numeroCnh,
        foto: "string", // Substitua se necessário
        cidade: formData.cidade,
        estado: formData.estado,
        numero: formData.numero,
        bairro: formData.bairro,
        cep: formData.cep,
        complemento: formData.complemento,
        rendaMensal: parseFloat(formData.rendaMensal), // Certifique-se de enviar um número
      };

      const response = await axiosInstance.post("/api/motorista", payload);

      if (response.status === 200 || response.status === 201) {
        alert('Cadastro realizado com sucesso!');
        setFormData({
          nome: '',
          numeroTelefone: '',
          cpf: '',
          email: '',
          numeroCnh: '',
          bairro: '',
          endereco: '',
          cidade: '',
          estado: '',
          numero: '',
          cep: '',
          complemento: '',
          rendaMensal: '',
          dataNascimento: '',
        }); // Limpar formulário
        setCurrentPage(1); // Voltar para a primeira página
      } else {
        alert(`Erro ao realizar o cadastro: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar-se ao servidor.');
    }
  };

  return (
    <YStack space={4} padding={16}>

      {/* Botão de Retorno */}

      {currentPage === 1 && (
        <>
          <Input
            style={styles.input}
            placeholder="Nome"
            value={formData.nome}
            onChangeText={(value) => handleChange('nome', value)}
          />
          <TextInputMask
            style={styles.input}
            type={'custom'}
            placeholder="Telefone"
            options={{
              mask: '99 99999-9999',
            }}
            value={formData.numeroTelefone}
            onChangeText={(value) => handleChange('numeroTelefone', value)}
          />
          <TextInputMask
            style={styles.input}
            type={'custom'}
            placeholder='CPF'
            options={{
              mask: '999.999.999-99'
            }}
            value={formData.cpf}
            onChangeText={(value) => handleChange('cpf', value)}
          />
          <Input
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
          />
          <Input
            style={styles.input}
            placeholder="Número da CNH"
            value={formData.numeroCnh}
            onChangeText={(value) => handleChange('numeroCnh', value)}
          />
          <Input
            style={styles.input}
            placeholder="Renda Mensal"
            value={formData.rendaMensal}
            onChangeText={(value) => handleChange('rendaMensal', value)}
          />
          <TextInputMask
            style={styles.input}
            type={'datetime'}
            placeholder='Data de Nascimento'
            options={{
              format: 'DD/MM/YYYY'
            }}
            value={formData.dataNascimento}
            onChangeText={(value) => handleChange('dataNascimento', value)}
          />
        </>
      )}

      {currentPage === 2 && (
        <>
          <Input
            style={styles.input}
            placeholder="Bairro"
            value={formData.bairro}
            onChangeText={(value) => handleChange('bairro', value)}
          />

          <Input
            style={styles.input}
            placeholder="Cidade"
            value={formData.cidade}
            onChangeText={(value) => handleChange('cidade', value)}
          />
          <Input
            style={styles.input}
            placeholder="Estado"
            value={formData.estado}
            onChangeText={(value) => handleChange('estado', value)}
          />
          <Input
            style={styles.input}
            placeholder="Número"
            value={formData.numero}
            onChangeText={(value) => handleChange('numero', value)}
          />
          <Input
            style={styles.input}
            placeholder="CEP"
            value={formData.cep}
            onChangeText={(value) => handleChange('cep', value)}
          />
          {/* <Input
            style={styles.input}
            placeholder="Endereço"
            value={formData.endereco}
            onChangeText={(value) => handleChange('endereco', value)}
          /> */}
        </>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <Button onPress={handlePrev} disabled={currentPage === 1}>
          Anterior
        </Button>
        {currentPage === 2 ? (
          <Button onPress={() => { handleSubmit(); router.push('/Login-driver') }}
            style={{
              backgroundColor: 'green',
            }}>
            Enviar
          </Button>

        ) : (
          <Button
            theme="green"
            onPress={handleNext}>
            Próximo
          </Button>

        )}
      </View>

      <View style={{ marginBottom: 16, marginTop: 16 }}>
        <Button theme="red"

          onPress={() => { router.push('/Login-driver') }}>Cancelar
        </Button>
      </View>

    </YStack>
  );
};