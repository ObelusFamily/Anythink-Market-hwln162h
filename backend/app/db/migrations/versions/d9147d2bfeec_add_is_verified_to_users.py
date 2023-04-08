"""add is_verified to users

Revision ID: d9147d2bfeec
Revises: fdf8821871d7
Create Date: 2023-04-08 02:08:09.683253

"""
from alembic import op
import sqlalchemy as sa


revision = 'd9147d2bfeec'
down_revision = 'fdf8821871d7'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column('users', sa.Column('is_verified', sa.Boolean, server_default=sa.literal(False, sa.Boolean)))



def downgrade() -> None:
    op.drop_column('users', 'is_verified')

