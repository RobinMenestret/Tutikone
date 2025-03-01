import json

def json_to_sql(json_file, subject_id, output_sql_file):
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    sql_statements = []

    for question in data['questions']:
        level = question['niveau']
        statement = question['question']['énoncé']
        hint = question['question'].get('commentaire', '')
        question_comment = question['question'].get('commentaire', '')
        answer = question['réponse']['réponse']
        explanation = question['réponse'].get('explication', '')
        answer_comment = question['réponse'].get('commentaire', '')
        answer_source = question['réponse'].get('source', '')
        origin_source = question['origine'].get('source', '')

        sql = f"""
        INSERT INTO questions (subject_id, level, statement, hint, question_comment, answer, explanation, answer_comment, answer_source, origin_source)
        VALUES ({subject_id}, {level}, '{statement.replace("'", "''")}', '{hint.replace("'", "''")}', '{question_comment.replace("'", "''")}', '{answer.replace("'", "''")}', '{explanation.replace("'", "''")}', '{answer_comment.replace("'", "''")}', '{answer_source.replace("'", "''")}', '{origin_source.replace("'", "''")}');
        """
        sql_statements.append(sql.strip())

    with open(output_sql_file, 'w', encoding='utf-8') as file:
        for sql in sql_statements:
            file.write(sql + '\n')

if __name__ == "__main__":
    json_file = 'c:/Users/Robin\'s PC/git/Tutikone/SUJETS/le_tore.json'
    subject_id = 1  # Replace with the actual subject_id
    output_sql_file = 'c:/Users/Robin\'s PC/git/Tutikone/SUJETS/le_tore.sql'
    json_to_sql(json_file, subject_id, output_sql_file)
    print(f'SQL statements have been written to {output_sql_file}')