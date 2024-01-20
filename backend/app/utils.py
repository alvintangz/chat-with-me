import uuid

def is_valid_uuid4(input_str):
    try:
        uuid_obj = uuid.UUID(input_str, version=4)
        return str(uuid_obj) == input_str
    except ValueError:
        return False
