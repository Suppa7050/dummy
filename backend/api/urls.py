from django.urls import path
from .views import JobListCreateView, JobDetailView, ApplicationCreateView, AnswerCreateView, ApplicationListByJobView, apply_for_job
from . import views
urlpatterns = [
    path('jobs/', JobListCreateView.as_view(), name='job-list-create'),
    path('jobs/<int:pk>/', JobDetailView.as_view(), name='job-detail'),
    path('applications/', ApplicationCreateView.as_view(), name='application-create'),
    path('applications/<int:job_id>/', ApplicationListByJobView.as_view(), name='application-list-by-job'),
    path('answers/', AnswerCreateView.as_view(), name='answer-create'),
    path('jobs/<int:job_id>/apply/', views.apply_for_job, name='apply-for-job'),

]
