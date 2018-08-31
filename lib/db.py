import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
#Base = declarative_base()
from sqlalchemy.orm import sessionmaker

from lib import schema

def connect(conn_str):

    print('...Connecting to the database...')

    ## Connect to the database specified in the config file
    engine = sqlalchemy.create_engine(conn_str, connect_args={'check_same_thread': False}, echo=False)

    ## Create and commit all of the tables
    schema.Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    Session.configure(bind=engine)
    session = Session()
    return session, engine
