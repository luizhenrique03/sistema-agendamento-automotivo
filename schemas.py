from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# ----------------- CLIENTE -----------------
class ClienteBase(BaseModel):
    nome: str
    email: EmailStr
    telefone: str

class ClienteCreate(ClienteBase):
    pass  # herda todos os campos de ClienteBase

class ClienteRead(ClienteBase):
    id: int  # id que vem do banco

    class Config:
        orm_mode = True

# ----------------- SERVIÇO -----------------
class ServicoBase(BaseModel):
    tipo_servico: str

class ServicoCreate(ServicoBase):
    pass

class ServicoRead(ServicoBase):
    id: int

    class Config:
        orm_mode = True

# ----------------- VEÍCULO -----------------
class VeiculoBase(BaseModel):
    cliente_id: int
    marca: str
    modelo: str
    ano: int

class VeiculoCreate(VeiculoBase):
    pass

class VeiculoRead(VeiculoBase):
    id: int

    class Config:
        orm_mode = True

# ----------------- AGENDAMENTO -----------------
class AgendamentoBase(BaseModel):
    cliente_id: int
    data_hora: datetime  
    servico_id: int
    veiculo_id: int

class AgendamentoCreate(AgendamentoBase):
    pass

class AgendamentoRead(AgendamentoBase):
    id: int

    class Config:
        orm_mode = True