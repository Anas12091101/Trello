from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from board.models import Board, Member
from card.models import Card
from .serializers import BoardSerializer

@api_view(["POST"])
def createuser(request):
    data=request.data
    try:
        user=User.objects.raw('SELECT * FROM AUTH_USER WHERE EMAIL=%s',[request.data['email']])
        user=user[0]
        # print(user.username)
        data={'status':'email_constraint'}
        print(data)
        return Response(data) 
    except:
        try:
            user=User.objects.create(username=data["email"],password=make_password(data["password"]),email=data["email"],last_name=data["lastname"],first_name=data["firstname"])
            data={'status':'success'}
        except:
            data={'status':'user_constraint'}

    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createboard(request):
    user=request.user
    board=Board.objects.create(owner=user,title=request.data["title"],description=request.data["description"])
    return Response({"status":"success"})

@api_view(["POST","PUT"])
@permission_classes([IsAuthenticated])
def addmembers(request):
    for member in request.data["members"]:
        try:
            print(member)
            user=User.objects.get(email=member["email"])
            board=Board.objects.get(id=member["board_id"])
            print(user,board)
            member=Member.objects.create(member=user,board=board)
            data={"status":"success"}
        except:
            data={"status":"notfound"}
    return Response(data)

@api_view(["POST","PUT"])
@permission_classes([IsAuthenticated])
def createcard(request):
    d=request.data
    try:
        card=Card.objects.create(board_id=d["board_id"],type=d["type"],title=d["title"],
                description=d["description"],assigned=d["assigned"],label=d["label"])
        data={"status":"success"}
    except:
        data={"status":"error"}
    return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getBoard(request):
    board=Board.objects.get(id=request.data["id"])
    ser=BoardSerializer(board,many=False)
    return Response(ser.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getAllBoards(request):
    board=Board.objects.filter(owner=request.user)
    ser=BoardSerializer(board,many=True)
    return Response(ser.data)