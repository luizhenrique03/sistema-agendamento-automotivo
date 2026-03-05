const apiUrl = "http://localhost:8000";

async function carregarAgendamentos() {
  try {
    const res = await fetch(apiUrl + "/agendamentos/");
    const agendamentos = await res.json();
    const tbody = document.getElementById("agendamentosTable");
    tbody.innerHTML = "";

    for (const a of agendamentos) {
      const clienteRes = await fetch(apiUrl + "/clientes/" + a.cliente_id);
      const cliente = await clienteRes.json();

      const veiculoRes = await fetch(apiUrl + "/veiculos/" + a.veiculo_id);
      const veiculo = await veiculoRes.json();

      const servicoRes = await fetch(apiUrl + "/servicos/" + a.servico_id);
      const servico = await servicoRes.json();

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${veiculo.marca} ${veiculo.modelo} (${veiculo.ano})</td>
        <td>${servico.tipo_servico}</td>
        <td>${a.data_hora}</td>
        <td>
          <button class="excluir" onclick="excluirAgendamento(${a.id})">
            Excluir
          </button>
        </td>
      `;
      tbody.appendChild(row);
    }
  } catch (err) {
    console.error("Erro ao carregar agendamentos:", err);
  }
}

async function excluirAgendamento(id) {
  await fetch(apiUrl + "/agendamentos/" + id, { method: "DELETE" });
  carregarAgendamentos();
}

function novoAgendamento() {
  if (window.location.port === "8000") {
    window.location.href = "/static/templates/agendamento.html";
  } else {
    window.location.href = "agendamento.html";
  }
}

carregarAgendamentos();