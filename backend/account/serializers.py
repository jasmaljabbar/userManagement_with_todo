from rest_framework import serializers
from .models import UserData


class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = UserData
        fields = ["id", "email", "name", "password", "confirm_password"]

    def create(self, validated_data):
        password = validated_data.get("password")
        confirm_password = validated_data.get("confirm_password")

        if password and confirm_password and password != confirm_password:
            raise serializers.ValidationError({"password": "Passwords do not match."})

        user = UserData.objects.create(
            email=validated_data["email"], name=validated_data["name"]
        )
        user.set_password(password)
        user.save()
        return user
