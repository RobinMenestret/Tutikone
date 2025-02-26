import json
import psycopg2

# Load JSON data
with open('exponentielle.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname="your_db_name",
    user="your_db_user",
    password="your_db_password",
    host="your_db_host",
    port="your_db_port"
)
cur = conn.cursor()

# Insert subject
cur.execute("INSERT INTO subjects (name, description) VALUES (%s, %s) RETURNING id", (data['nom'], data['description']))
subject_id = cur.fetchone()[0]

# Insert questions
for question in data['questions']:
    cur.execute("""
        INSERT INTO questions (
            subject_id, level, statement, hint, question_comment, answer, explanation, answer_comment, answer_source, origin_source, author_id
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, (SELECT id FROM users WHERE name = %s))
    """, (
        subject_id,
        question['niveau'],
        question['question']['énoncé'],
        question['question']['indice'],
        question['question']['commentaire'],
        question['réponse']['réponse'],
        question['réponse']['explication'],
        question['réponse']['commentaire'],
        question['réponse']['source'],
        question['origine']['source'],
        question['origine']['auteur']
    ))

# Commit and close
conn.commit()
cur.close()
conn.close()