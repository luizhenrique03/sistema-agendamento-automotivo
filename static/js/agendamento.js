const apiUrl = "http://127.0.0.1:8000";

function voltarInicio() {
  if (window.location.port === "8000") {
    // quando rodando no servidor local (porta 8000)
    window.location.href = "/static/templates/index.html";
  } else {
    // quando rodando em produção
    window.location.href = "/templates/index.html";
  }
}

document.getElementById("agendamentoForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const cliente = {
        nome: document.getElementById("nomeCliente").value,
        email: document.getElementById("emailCliente").value,
        telefone: document.getElementById("telefoneCliente").value
      };

      const resCliente = await fetch(apiUrl + "/clientes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
      });
      const clienteData = await resCliente.json();

      const veiculo = {
        cliente_id: clienteData.id,
        marca: document.getElementById("marcaVeiculo").value,
        modelo: document.getElementById("modeloVeiculo").value,
        ano: parseInt(document.getElementById("anoVeiculo").value)
      };

      const resVeiculo = await fetch(apiUrl + "/veiculos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(veiculo)
      });
      const veiculoData = await resVeiculo.json();

      const servico = {
        tipo_servico: document.getElementById("tipoServico").value
      };

      const resServico = await fetch(apiUrl + "/servicos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servico)
      });
      const servicoData = await resServico.json();

      const agendamento = {
        cliente_id: clienteData.id,
        veiculo_id: veiculoData.id,
        servico_id: servicoData.id,
        data_hora: document.getElementById("dataHora").value
      };

      const resAgendamento = await fetch(apiUrl + "/agendamentos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agendamento)
      });

      if (resAgendamento.ok) {
        alert("Agendamento criado com sucesso!");

        if (window.location.port === "8000") {
          window.location.href = "/static/templates/index.html";
        } else {
          window.location.href = "/templates/index.html";
        }
      } else {
        alert("Erro ao criar agendamento");
      }

    } catch (error) {
      alert("Erro ao criar agendamento: " + error);
    }
  });