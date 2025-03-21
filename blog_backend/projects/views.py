from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from blog_backend.projects.models import Project
from blog_backend.projects.serializers import ProjectSerializer

class ProjectListView(APIView):
    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectDetailView(APIView):
    def get(self, request, id):
        try:
            project = Project.objects.get(id=id)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProjectSerializer(project)
        return Response(serializer.data, status=status.HTTP_200_OK)
