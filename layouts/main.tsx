import React, { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CSS_BREAKPOINT_END_L,
  CSS_BREAKPOINT_END_M,
  CSS_BREAKPOINT_END_S,
  CSS_BREAKPOINT_START_L,
  CSS_BREAKPOINT_START_M,
  CSS_BREAKPOINT_START_XL,
  ORGANISATION_NAME,
} from "../utils/constants";
import Meta from "../components/meta";
import Menu from "../components/menu";
import Header from "../components/header";
import Footer from "../components/footer";
import { Popin } from "../components/popin";
import Heading4 from "../components/h4";
import Paragraph from "../components/p";

type Props = {
  children?: ReactNode;
  title: string;
  description?: string;
  image?: string;
};

const BACKDROP_KEY = "--backdropped-state";
const Layout = ({ children, title, description = "", image = "" }: Props) => {
  const [popinIsVisible, setPopinIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(BACKDROP_KEY) !== null) {
        setPopinIsVisible(
          JSON.parse(window.localStorage.getItem(BACKDROP_KEY) || "false")
        );
      } else {
        setPopinIsVisible(false);
//        setPopinIsVisible(true);
      }
    } catch (err) {}
  }, []);
  useEffect(() => {
    window.localStorage.setItem(BACKDROP_KEY, JSON.stringify(popinIsVisible));
  }, [popinIsVisible]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data)
  };

  return (
    <div className="root">
      <Meta
        name={ORGANISATION_NAME}
        title={title}
        description={description}
        image={image}
      />
      <Header />
      <Menu />
      <div className="contents">{children}</div>
      <Footer />
      <Popin
        popinIsVisible={popinIsVisible}
        setPopinIsVisible={setPopinIsVisible}
      >
        <Heading4>Restez informé⋅es&nbsp;!</Heading4>
        <Paragraph>S'inscrire à la lettre d'information&nbsp;!</Paragraph>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>
            <label>
              Nom&nbsp;:
              <br />
              <input
                type="text"
                autoComplete="family-name"
                {...register("familyName")}
              />
            </label>
          </p>
          <p>
            <label>
              Prénom&nbsp;:
              <br />
              <input
                type="text"
                autoComplete="given-name"
                {...register("givenName")}
              />
            </label>
          </p>
          <p>
            <label>
              E-mail&nbsp;:
              <br />
              <input
                type="email"
                autoComplete="email"
                className={errors.email ? "required" : ""}
                {...register("email", { required: true })}
              />
            </label>
          </p>
          <p>
            <label>
              Commune&nbsp;:
              <br />
              <input
                type="text"
                autoComplete="address-level2"
                {...register("city")}
              />
            </label>
          </p>
          <p>
            <label>
              Téléphone&nbsp;:
              <br />
              <input type="tel" autoComplete="tel" {...register("tel")} />
            </label>
          </p>
          <p>
            <label>
              <input
                type="checkbox"
                className={errors.ok ? "required" : ""}
                {...register("ok", { required: true })}
              />{" "}
              J’accepte que les informations saisies soient utilisées dans le
              cadre de la campagne
            </label>
          </p>
          <p className="submit">
            <button type="submit">Envoyer</button>
          </p>
        </form>
      </Popin>
      <style jsx>{`
        .root {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          background: var(--primary);
        }
        .contents {
          flex-grow: 1;
          margin: 0 auto var(--vRythm) auto;
        }
        @media screen and (max-width: ${CSS_BREAKPOINT_END_S}) {
          .contents {
            width: 100%;
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_M}) and (max-width: ${CSS_BREAKPOINT_END_M}) {
          .contents {
            width: calc(calc(var(--block) * 2) + calc(var(--gutter) * 3));
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) and (max-width: ${CSS_BREAKPOINT_END_L}) {
          .contents {
            width: calc(calc(var(--block) * 3) + calc(var(--gutter) * 4));
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_XL}) {
          .contents {
            width: calc(calc(var(--block) * 3) + calc(var(--gutter) * 4));
          }
        }
        p {
          margin: 0;
        }
        p.submit {
          text-align: center;
        }
        input[type="text"],
        input[type="tel"],
        input[type="email"] {
          width: var(--block);
          border: var(--border) solid var(--dark);
        }
        input[type="checkbox"] {
          border: var(--border) solid var(--dark);
        }
        input[type="checkbox"].required,
        input[type="text"].required,
        input[type="tel"].required,
        input[type="email"].required {
          border: var(--border) solid var(--danger);
        }
        label {
        }
        button {
          display: inline-block;
          border-radius: calc(var(--borderRadius));
          line-height: calc(var(--vRythm) * 1);
          margin: calc(var(--vRythm) * 0.5) 0 0 0;
          appearance: none;
          border: none;
          border: var(--border) solid var(--light);
          color: var(--light);
          background-color: var(--tertiary);
          padding: 0 var(--gutter);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Layout;
