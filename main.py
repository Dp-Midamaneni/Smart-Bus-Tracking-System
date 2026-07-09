from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


def get_parents(person_data):
    return {person_data["father"], person_data["mother"]}


def get_grandparents(person_data):
    return {
        person_data["pgf"], person_data["pgm"],
        person_data["mgf"], person_data["mgm"]
    }


def find_relation(A, B):
    parents_A = get_parents(A)
    parents_B = get_parents(B)

    # Siblings
    if parents_A & parents_B:
        if A["gender"] == "male" and B["gender"] == "male":
            return "bros"
        elif A["gender"] == "female" and B["gender"] == "female":
            return "siss"
        else:
            return "bro&sis"

    # Cousins (common grandparents)
    if get_grandparents(A) & get_grandparents(B):
        return "cousins"

    return "no relation"


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/relation", response_class=HTMLResponse)
async def relation(request: Request):
    form = await request.form()

    A = {
        "gender": form["a_gender"],
        "father": form["a_father"],
        "mother": form["a_mother"],
        "pgf": form["a_pgf"],
        "pgm": form["a_pgm"],
        "mgf": form["a_mgf"],
        "mgm": form["a_mgm"]
    }

    B = {
        "gender": form["b_gender"],
        "father": form["b_father"],
        "mother": form["b_mother"],
        "pgf": form["b_pgf"],
        "pgm": form["b_pgm"],
        "mgf": form["b_mgf"],
        "mgm": form["b_mgm"]
    }

    result = find_relation(A, B)

    return templates.TemplateResponse(
        "index.html",
        {"request": request, "result": result}
    )
