import { H2, H6, Input, Button } from "tamagui";
import { Image, TouchableOpacity, ScrollView, View, Text } from "react-native";
import React from "react";

export default function Login() {
    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <View style={{ backgroundColor: "white", marginTop: 80 }}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    {/* <Image
                        source={require("./public/icons/tomato/TomatoNotebook.png")}
                        style={{ width: 160, height: 160 }}
                    /> */}
                </View>
                <View style={{ alignItems: "center", marginTop: 32 }}>
                    <H2 style={{ textAlign: "center", color: "#FB923C" }}>ENTRAR</H2>
                    <View style={{ alignItems: "center", marginTop: 32 }}>
                        <View>
                            <H6 style={{ color: "black" }}>Email</H6>
                            <Input
                                style={{
                                    width: 320,
                                    backgroundColor: "white",
                                    color: "black",
                                    borderRadius: 4,
                                    shadowColor: "#000",
                                    shadowOpacity: 0.1,
                                    borderColor: "#FB923C"
                                }}
                                placeholder="Digite seu e-mail"
                            />
                        </View>
                        <View style={{ marginTop: 16, alignItems: "center" }}>
                            <View style={{ width: 320 }}>
                                <H6 style={{ color: "black" }}>Senha</H6>
                            </View>
                            <Input
                                style={{
                                    width: 320,
                                    backgroundColor: "white",
                                    color: "black",
                                    borderRadius: 4,
                                    shadowColor: "#000",
                                    shadowOpacity: 0.1,
                                    borderColor: "#FB923C"
                                }}
                                placeholder="Digite sua senha"
                                secureTextEntry
                            />
                            {/* Simulação de erro */}
                            {false ? (
                                <Text style={{ color: "#EF4444", marginTop: 16, fontSize: 12, textAlign: "center" }}>
                                    Mensagem de erro mockada
                                </Text>
                            ) : null}
                        </View>
                        <Button style={{ width: 240, backgroundColor: "#FB923C", borderRadius: 24, marginTop: 32 }}>
                            Entrar
                        </Button>
                        <H6 style={{ color: "black", marginVertical: 16 }}>Ou</H6>
                        <Button style={{ backgroundColor: "#FB923C", color: "white" }}>
                            Logar com o Google
                        </Button>
                        <TouchableOpacity>
                            <H6 style={{ color: "#3B82F6", textDecorationLine: "underline", marginTop: 32 }}>
                                Esqueceu a senha?
                            </H6>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
