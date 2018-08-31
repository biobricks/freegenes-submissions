from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Table, Text, inspect, DateTime, func, \
    Numeric, Boolean
from sqlalchemy import Enum as EnumType
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
# from sqlalchemy_imageattach.entity import Image, image_attachment
from enum import Enum

from sqlalchemy_fsm import FSMField, transition

Base = declarative_base()

# Basics
class EnumString(Enum):
    def __str__(self):
        return str(self.value)

class Id():
    id = Column(Integer, primary_key=True)


# added by juul
class SubmittedPartType(EnumString):
    prokaryotic_promoter = 'prokaryotic-promoter'
    eukaryotic_promoter = 'eukaryotic-promoter'
    rbs = 'rbs'
    cds = 'cds'
    terminator = 'terminator'
    operon = 'operon'
    other = 'other'

class Physical(Id):
    well_id = Column(Integer, ForeignKey('well.id'))
    well = relationship("Well")

class Virtual(Base, Id):
    __tablename__ = 'virtuals' # added by juul

    date_created = Column(DateTime(timezone=True), server_default=func.now())
    genbank_file = Column(String) # TODO this is a file, so let's dump to str for now
    name = Column(String) # Human readable name. Different than human readable id.

    # added by juul
    tags = Column(String)
    description = Column(String) # Human readable name. Different than human readable id.
    bionet_id = Column(String)
    submitter_name = Column(String)
    submitter_email = Column(String)
    submitted_part_type = Column(EnumType(SubmittedPartType)) # TODO actually a subset? (vector?)
    submitted_codon_modify_ok = Column(Boolean)
    submitted_url = Column(String)
    
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
