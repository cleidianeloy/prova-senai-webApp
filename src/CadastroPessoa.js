import axios from 'axios';
import {useEffect} from 'react';
import './cadastroPessoa.css';
import { useState } from 'react';

//Cadastro de Pessoa
function CadastroPessoa(){
    /* function onChangeCep(event){
        const cep = event.target.value;
        if(cep.length === 8){
            axios.get(`https://viacep.com.br/ws/${cep}/json`).then(response =>{
                const rua = document.getElementById("rua-input");
                const cidade = document.getElementById("cidade-input");
                const estado = document.getElementById('estado-input');
                rua.value = response.data.logradouro ?? "";
                cidade.value = response.data.localidade ?? "";
                estado.value = response.data.estado ?? "";
            }).catch((err)=>{
                console.log(err);
            })
        }
    }*/
   const [pessoas, setPessoas] = useState([])
   const caminho = 'http://localhost:8080/pessoa' 
    useEffect(()=>{
        axios.get(`${caminho}/all`).then((response)=>{
            setPessoas(response.data);
        }).catch(error =>{
            console.error(error)
        })
    }, []);
    function validateNome(event) {
        const nomeInput = event.target;
        const name = nomeInput.value.split(' ');
        console.log(name);
        console.log(name.length);
        if(name.length > 1){
            let valido = true;
            valido = name.every((nome, id)=>{
                return id === 0 ? nome[0] === nome[0]?.toUpperCase() : nome[0] === nome[0]?.toLowerCase();
            })
            console.log(valido);
            if(!valido){
                nomeInput.setCustomValidity("O primeiro nome deve ter a primeira letra maiscula e os outros letra minuscula");
            }else{
                nomeInput.setCustomValidity("");
            }
        }else if(name.length === 1){
            nomeInput.setCustomValidity("O nome deve ter mais que um nome");
        }else{
            nomeInput.setCustomValidity("");
        }
    }
    function validateDataNasc(event){
        const input = event.target;
        const date = new Date(input.value);
        var hoje = new Date();
        hoje.setHours(0,0,0,0);
        if(date > hoje){
            input.setCustomValidity("A data de nascimento não pode ser maior que a data de hoje");
        }else{
            input.setCustomValidity("");
        }
    }
    function handleSubmit(event){
        event.preventDefault();
        const nome = document.getElementByid('nome-input').value;
        const nascimento = document.getElementByid('nascimento-input').value;
        const cpf = document.getElementById('cpf-input').value;
        const cep = document.getElementById('cep-input').value;
        const rua = document.getElementById('rua-input').value;
        const numero = document.getElementById('numero-input').value;

        axios.post(`${caminho}/add`, {
            nome: nome, 
            nascimento: nascimento, 
            cpf: cpf,
            cep: cep,
            rua: rua,
            numero: numero
        }).then((response)=>{
            console.log(response)
        })

    }
    return(
        <section>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro de Pessoa</h1>
                <fieldset id="pessoa">
                        <label id="nome" >
                            <span>Nome</span>
                            <input id="nome-input" name="name" type="text" onInput={validateNome} required/>
                        </label>
                        <label id="cpf">
                            <span>CPF</span>
                            <input id="cpf-input" type="text" name="cpf" required max-lenght="11"/>
                        </label>
                        <label id="dataNasc">
                            <span>Data de Nascimento</span>
                            <input id="nascimento-input" type="date" name="date" onInput={validateDataNasc}/>
                        </label>
                </fieldset>
                <fieldset id="endereco">
                <legend>Endereço</legend> 
                        <label id="cep">
                            <span>CEP</span>
                            <input id="cep-input" name="cep" type="number" max="99999999" />
                        </label>
                        <label id="rua">
                            <span>Rua</span>
                            <input id="rua-input" type="text"/>
                        </label>
                        <label id="num">
                            <span>Numero</span>
                            <input id="num-input" type="number" />
                        </label>
                        <label id="cidade">
                            <span>Cidade</span>
                            <input id="cidade-input" type="text" />
                        </label>
                        <label id="estado">
                            <span>Estado</span>
                            <input id="estado-input"type="text" />
                        </label>
                </fieldset>
                <button type="submit">Salvar</button>
            </form>
            <div>
                <table>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Cidade</th>
                        <th>Ação</th>
                    </tr>
                    {pessoas.map(pessoa => {
                        return (
                            <tr>
                                <td>{pessoa.nome}</td>
                                <td>{pessoa.cpf}</td>
                                <td>{pessoa.cidade}</td>
                                <td></td>
                            </tr>
                        )
                    })
                    }

                </table>
            </div>
        </section>
    )
}
export default CadastroPessoa;