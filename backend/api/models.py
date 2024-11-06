from django.db import models

class Job(models.Model):
    job_name = models.CharField(max_length=100)
    job_role = models.CharField(max_length=100)
    job_description = models.TextField()
    salary = models.FloatField()
    experience = models.FloatField()
    job_type = models.CharField(max_length=100)
    last_date = models.DateField()

    def __str__(self):
        return self.job_name

class RequiredSkills(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='required_skills')
    mandatory_flag = models.BooleanField()
    skill_name = models.CharField(max_length=100)

class Question(models.Model):
    job = models.ForeignKey(Job, related_name='questions', on_delete=models.CASCADE)
    question_text = models.TextField()

    def __str__(self):
        return self.question_text

class Application(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('reviewed', 'Reviewed'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected')
    ]
    student_id = models.IntegerField()
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"Application {self.id} - {self.status}"

class Answer(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    answer_text = models.TextField()

    def __str__(self):
        return f"Answer {self.id} for Application {self.application_id}"
