"""Add column to table

Revision ID: e39bb3f9ee36
Revises: fdf8821871d7
Create Date: 2023-04-09 19:13:29.257850

"""
from alembic import op
import sqlalchemy as sa


revision = 'e39bb3f9ee36'
down_revision = 'fdf8821871d7'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column('users', sa.Column('is_verified', sa.Boolean, server_default=sa.literal(False)))


def downgrade() -> None:
    op.drop_column('users', 'is_verified')
