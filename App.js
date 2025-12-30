
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

//Tel inicial
import CF from "./src/components/TelaInicial";
//Tela Splash
import Splash from "./src/components/TelaSplash";
//Tela Lembretes
import Lembrete from "./src/components/TelaLembretes";
//Tela Sons
import TelaSons from "./src/components/TelaSons";

//cliente
import TelaInicialCli from "./src/components/Cliente/TelaInicialCliente";
import TelaLoginCliente from "./src/components/Cliente/TelaLoginCliente";
import Cadastrar from "./src/components/Cliente/Arrumar Cadastro/TelaCadastro";
import Cadastrar2 from "./src/components/Cliente/Arrumar Cadastro/TelaCadastro2";
import Cadastrar3 from "./src/components/Cliente/Arrumar Cadastro/TelaCadastro3";
import ConfirmarCadastro from "./src/components/Cliente/Arrumar Cadastro/ConfirmarCad";
import Principal from "./src/components/Cliente/TelaPrincipalCliente";

//funcionario
import TelaInicialF from "./src/components/Funcionario/TelaInicialFuncionario";
import CadastrarF from "./src/components/Funcionario/TelaCadastroFuncionario";
import EntrarF from "./src/components/Funcionario/TelaLoginFuncionario";
import GFunc from "./src/components/Funcionario/TelaPrincipalFuncionario";

//mercado
import AMerc from "./src/components/Mercado/TelaAtualizarMercado";
import CadM from "./src/components/Mercado/TelaCadastrarMercado";
import GMerc from "./src/components/Mercado/TelaGerenciarMercado";

//lista
import MinhasListas from "./src/components/Lista/TelaTodasLista";
import ListaHoje from "./src/components/Lista/TelaListaHoje";
import TelaPrincipalLista from "./src/components/Lista/TelaPrincipalLista";
import FinalizarLista from "./src/components/Lista/TelaFinalizarLista";
import CriarLista from "./src/components/Lista/TelaCriarLista";
import SelecionarLista from "./src/components/Lista/TelaSelecionarLista";

//produto
import CatPro from "./src/components/Produto/TelaCategoriaProduto";
import CadPro from "./src/components/Produto/TelaCadastrarProduto";
import DetalhesProduto from "./src/components/Produto/TelaDetalhesProduto";
import Filtros from "./src/components/Produto/TelaFiltros";
import GerenciarProduto from "./src/components/Produto/TelaGerenciarProduto";
import EditarProduto from "./src/components/Produto/TelaEditarProduto";
import DetalheProduto from "./src/components/Produto/TelaDetalheProdutoFuncionario";
import DetalheProdutoCliente from "./src/components/Produto/TelaDetalheProdutoCliente";

//debug
import Bebidas from "./src/components/Debug/TelaProduto";
import Tubaina from "./src/components/Debug/TelaDetTub";
import Imagem from "./src/components/Debug/Imagem";

//mapa
import mapa from "./src/components/Debug/mapa";
import ListaProgramada from "./src/components/Lista/TelaListaProgramada";


const Stack = createStackNavigator();

const App = () => {
  const [SplashV, setSplashV] = useState(true);

  const handleSplashFinish = () => {
    setSplashV(false);
  };

  return (
    <NavigationContainer>
      {SplashV ? (
        <Splash onFinish={handleSplashFinish} />
      ) : (
        <Stack.Navigator initialRouteName="CF">
          <Stack.Screen
            name="CF"
            component={CF}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TelaInicialCli"
            component={TelaInicialCli}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EntrarCli"
            component={TelaLoginCliente}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastrar"
            component={Cadastrar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastrar2"
            component={Cadastrar2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastrar3"
            component={Cadastrar3}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ConfirmarCadastro"
            component={ConfirmarCadastro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Principal"
            component={Principal}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MinhasListas"
            component={MinhasListas}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TelaPrincipalLista"
            component={TelaPrincipalLista}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TelaInicialF"
            component={TelaInicialF}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CadastrarF"
            component={CadastrarF}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EntrarF"
            component={EntrarF}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CatPro"
            component={CatPro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Bebidas"
            component={Bebidas}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tubaina"
            component={Tubaina}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GFunc"
            component={GFunc}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="GMerc"
            component={GMerc}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CadM"
            component={CadM}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AMerc"
            component={AMerc}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GerenciarProduto"
            component={GerenciarProduto}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CadPro"
            component={CadPro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetalheProduto"
            component={DetalheProduto}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetalheProdutoCliente"
            component={DetalheProdutoCliente}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditarProduto"
            component={EditarProduto}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Lembrete"
            component={Lembrete}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TelaSons"
            component={TelaSons}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Filtros"
            component={Filtros}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetalhesProduto"
            component={DetalhesProduto}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Imagem"
            component={Imagem}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="mapa"
            component={mapa}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FinalizarLista"
            component={FinalizarLista}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CriarLista"
            component={CriarLista}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ListaHoje"
            component={ListaHoje}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ListaProgramada"
            component={ListaProgramada}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelecionarLista"
            component={SelecionarLista}
            options={{ headerShown: false }}
          />


        </Stack.Navigator>

      )}
    </NavigationContainer>
  );
};

export default App;
