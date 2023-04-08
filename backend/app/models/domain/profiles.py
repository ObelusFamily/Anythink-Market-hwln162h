from typing import Optional

from app.models.domain.rwmodel import RWModel
from pydantic import Field

class Profile(RWModel):
    username: str
    bio: str = ""
    image: Optional[str] = None
    following: bool = False
    is_verified: bool = Field(False, alias="isVerified")
