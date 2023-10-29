import React, {useEffect, useState} from "react";
import {createPortal} from "react-dom";

//отрендерить свое содержимое children в контейнер с определенным id

//функция кот облегчает процесс создания контейнера для портала
//ее задача создать div с нужным id и зарендерить его в переданной moundNode, если контейнер уже существует, то ничего не делать
//по умолчанию moundNode = document.body
type containerOptions = { id: string; mountNode?: HTMLElement };

const createContainer = (options: containerOptions) => {
  if (document.getElementById(options.id)) {
    return;
  }
  const { id, mountNode = document.body } = options;

  const portalContainer = document.createElement("div");
  portalContainer.setAttribute("id", id);

  mountNode.appendChild(portalContainer);
};

type PortalProps = { id: string; children: React.ReactElement };

const Portal = (props: PortalProps) => {
  const { id, children } = props;
  const [container, setContainer] = useState<HTMLElement>();

  useEffect(() => {
    if (id) {
      const portalContainer = document.getElementById(id);
      if (!portalContainer) {
        throw new Error("Error");
      }
      setContainer(portalContainer);
    }
  }, [id]);
  return container ? createPortal(children, container) : null;
};

export default Portal;
export { createContainer };
