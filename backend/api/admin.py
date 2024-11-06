from django.contrib import admin
from .models import Job, RequiredSkills, Question, Application, Answer

class RequiredSkillsInline(admin.TabularInline):
    model = RequiredSkills
    extra = 1

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('id','job_name', 'job_role', 'salary', 'experience', 'job_type', 'last_date')
    inlines = [RequiredSkillsInline, QuestionInline]
    search_fields = ('job_name', 'job_role')
    list_filter = ('job_type', 'last_date')

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('id', 'student_id', 'job', 'status')
    list_filter = ('status',)
    search_fields = ('job__job_name', 'student_id')

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('id', 'application', 'question', 'answer_text')
    search_fields = ('application__id', 'question__question_text')

# Register inline models separately if you want them to appear individually
@admin.register(RequiredSkills)
class RequiredSkillsAdmin(admin.ModelAdmin):
    list_display = ('id', 'job', 'skill_name', 'mandatory_flag')
    list_filter = ('mandatory_flag',)
    search_fields = ('skill_name',)

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'job', 'question_text')
    search_fields = ('question_text',)
