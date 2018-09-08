from rest_framework import serializers
from application.models import Entry, Row


class RowSerializer(serializers.ModelSerializer):

    class Meta:
        model = Row
        fields = ("level", "entry", "people")


class EntrySerializer(serializers.ModelSerializer):
    rows = RowSerializer(many=True)

    class Meta:
        model = Entry
        fields = "__all__"
        depth = 2
