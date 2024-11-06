from rest_framework import serializers
from .models import Job, RequiredSkills, Question, Application, Answer

class RequiredSkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequiredSkills
        fields = ['id', 'mandatory_flag', 'skill_name']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'question_text']

class JobSerializer(serializers.ModelSerializer):
    required_skills = RequiredSkillsSerializer(many=True, read_only=True)
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Job
        fields = ['id', 'job_name', 'job_role', 'job_description', 'salary', 'experience', 'job_type', 'last_date', 'required_skills', 'questions']

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'student_id', 'job', 'status','App_id']

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'application', 'question', 'answer_text']
