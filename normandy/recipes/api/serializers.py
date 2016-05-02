from rest_framework import serializers

from normandy.recipes.api.fields import ActionImplementationHyperlinkField
from normandy.recipes.models import Action, Recipe, ReleaseChannel


class ActionSerializer(serializers.ModelSerializer):
    arguments_schema = serializers.JSONField()
    implementation = serializers.CharField(write_only=True)
    implementation_url = ActionImplementationHyperlinkField()

    class Meta:
        model = Action
        fields = [
            'name',
            'implementation',
            'implementation_url',
            'arguments_schema',
        ]

class ReleaseChannelSerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = ReleaseChannel
        fields = [
            'name'
        ]


class RecipeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    revision_id = serializers.IntegerField()
    enabled = serializers.BooleanField()
    action = ActionSerializer()
    arguments = serializers.JSONField()
    sample_rate = serializers.FloatField()
    release_channels = ReleaseChannelSerializer()

    class Meta:
        model = Recipe
        fields = [
            'id',
            'name',
            'revision_id',
            'action',
            'arguments',
        ]


class BundleSerializer(serializers.Serializer):
    recipes = RecipeSerializer(many=True)
    country = serializers.CharField()
