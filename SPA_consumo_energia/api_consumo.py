from flask import Flask, g, request, jsonify
import sqlite3
import logging
from flask_cors import CORS
logging.basicConfig(level=logging.ERROR)

app = Flask(__name__)

CORS(app)


database = 'greenvolt.db'

def get_database():
    data = getattr(g, '_database', None)
    if data is None:
        data = g._database = sqlite3.connect(database)
    return data

@app.teardown_appcontext
def close_connection(exception):
    data = getattr(g, '_database', None)
    if data is not None:
        data.close()

@app.route('/fornecedores', methods=['GET'])
def listar_fornecedores():
    try:
        # estou pegando o consumo do cliente
        consumo_mensal = float(request.args.get('consumo', 150))
        # caso o consumo informado seja <= a 0. 
        if consumo_mensal <= 0:
            return jsonify({'erro': 'Consumo mensal deve ser um número maior que 0.'}), 400
        
        # pra executar comando no banco de dados
        data = get_database()
        cursor = data.cursor()
        cursor.execute("""
            SELECT nome, logo, estado_origem, custo_por_kWh, limite_minimo_kWh, 
                   numero_total_clientes, avaliacao_media 
            FROM fornecedores 
            WHERE limite_minimo_kWh <= ?
        """, (consumo_mensal,))
        fornecedores = cursor.fetchall()

        if not fornecedores:
            return jsonify({'erro': 'Nenhum fornecedor encontrado.'}), 404
        
        # formato na chamada da api
        lista_fornecedores = [
            {
                'nome': fornecedor[0],
                'logo': fornecedor[1],
                'estado_origem': fornecedor[2],
                'custo_por_kWh': fornecedor[3],
                'limite_minimo_kWh': fornecedor[4],
                'numero_total_clientes': fornecedor[5],
                'avaliacao_media': fornecedor[6]
            } 
            for fornecedor in fornecedores
        ]

        return jsonify({'fornecedores': lista_fornecedores})
    
    except ValueError as ve:
        logging.error("Erro de valor: %s", ve)
        return jsonify({'erro': 'Consumo mensal inválido. Por favor, insira um número válido.'}), 400
    
    except Exception as e:
        logging.error("Erro inesperado: %s", e)
        return jsonify({'erro': 'Erro ao processar a solicitação.'}), 500

if (__name__) == '__main__':
    app.run()
