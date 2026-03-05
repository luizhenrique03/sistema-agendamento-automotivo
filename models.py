from sqlalchemy import Column, Integer, String , ForeignKey
from database import Base

class Cliente(Base):
    __tablename__ = "clientes"
    id = Column(Integer, primary_key=True, index=True)
    nome=  Column(String(155),nullable=False)
    email = Column(String(155), nullable=False, unique=True)
    telefone = Column(String(20), nullable=False)
class Agendamento(Base):
    __tablename__ = "agendamentos"
    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer,ForeignKey('clientes.id'), nullable=False)
    data_hora = Column(String(20), nullable=False)
    servico_id= Column(Integer,ForeignKey('servicos.id'),nullable=False)
    veiculo_id = Column(Integer,ForeignKey('veiculos.id'),nullable=False)
class Servico(Base):
    __tablename__ = "servicos"
    id = Column(Integer, primary_key=True, index=True)
    tipo_servico = Column(String(155), nullable=False)
class Veiculo(Base):
    __tablename__ = "veiculos"
    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer,ForeignKey('clientes.id'), nullable=False)
    marca = Column(String(155), nullable=False)
    modelo = Column(String(155), nullable=False)
    ano = Column(Integer, nullable=False)