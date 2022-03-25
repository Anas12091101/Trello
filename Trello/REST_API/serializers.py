from rest_framework import  serializers
from board.models import Board, Member
from card.models import Card

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model=Card
        fields="__all__"

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model=Member
        fields="__all__"


class BoardSerializer(serializers.ModelSerializer):
    card=serializers.SerializerMethodField()
    member=serializers.SerializerMethodField()

    class Meta:
        model=Board
        fields="__all__"

    def get_card(self,obj):
        card=Card.objects.filter(board_id=obj.id)
        serializer=CardSerializer(card,many=True)
        return serializer.data

    def get_member(self,obj):
        member=Member.objects.filter(board_id=obj.id)
        serializer=MemberSerializer(member,many=True)
        return serializer.data
