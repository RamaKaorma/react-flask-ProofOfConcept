from flask import request, jsonify
from config import app, db
from models import Resource

# Retrieve
@app.route("/resources", methods=["GET"]) # This line is the Decorator
def get_resources():
    resources = Resource.query.all()
    json_resources = list(map(lambda x: x.to_json(), resources))
    return jsonify({"resources": json_resources})

# Create
@app.route("/create_resource", methods=["POST"])
def create_resource():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    media_link = request.json.get("mediaLink")

    # Ensure reqs are met
    if not first_name or not last_name or not email or not media_link:
        return (
            jsonify({"message": "You must include a first name, last name, email and link to media file"}),
            400,
        )
    
    # Add a new resource
    new_resource = Resource(first_name=first_name, last_name=last_name, email=email, media_link=media_link)
    try:
        db.session.add(new_resource) # entered session, ready to enter the database
        db.session.commit() # enter new_resource into database
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "User created!"}), 201


# Update
@app.route("/update_resource/<int:user_id>", methods=["PATCH"])
def update_resource(user_id):
    resource = Resource.query.get(user_id)

    if not resource:
        return jsonify({"message": "User not found"}), 404
    
    data = request.json
    resource.first_name = data.get("firstName", resource.first_name)
    resource.last_name = data.get("lastName", resource.last_name)
    resource.email = data.get("email", resource.email)
    resource.media_link = data.get("mediaLink", resource.media_link)

    db.session.commit()

    return jsonify({"message": "User updated."}), 200


# Delete
@app.route("/delete_resource/<int:user_id>", methods=["DELETE"])
def delete_resource(user_id):
    resource = Resource.query.get(user_id)

    if not resource:
        return jsonify({"message": "User not found"}), 404
    db.session.delete(resource)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)