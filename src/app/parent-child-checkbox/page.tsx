'use client'
import React, { useEffect, useState } from "react";

export default function App() {
  const [checkBox, setCheckBox] = useState<any>({
    parent: {
      active: true,
      child: {
        childa: {
          active: true,
          child: { childa1: { active: true }, childa2: { active: true } },
        },
        childb: {
          active: true,
          child: { childb1: { active: false }, childb2: { active: true } },
        },
        childc: {
          active: true,
          child: { childc1: { active: true }, childc2: { active: true } },
        },
      },
    },
  });

  const [first, setfirst] = useState("second");

  const changeChildrenToValue = (objref: any, value: any) => {
    if (!objref) return;

    objref.active = value;

    Object.keys(objref.child || {}).forEach((singleKey) => {
      changeChildrenToValue(objref.child[singleKey], value);
    });
  };

  function changeParentValue(objref: any): any {
    if (!objref?.child) return objref["active"];

    return [
      ...Object.keys(objref?.child ?? {})?.map((singleKey) => {
        if (!objref?.child?.[singleKey]?.["child"]) {
          return objref?.child?.[singleKey]?.["active"];
        } else {
          let val = changeParentValue(objref?.child?.[singleKey]);
          objref.child[singleKey]["active"] = val;
          return val;
        }
      })
    ].every((val) => val);
  }

  const getNestedProperty = (obj: any, path: any) => {
    return path?.split(".").reduce((acc: any, key: any) => acc && acc?.[key], obj);
  };

  const returnComponent = (nestingKey: any) => {
    console.log('nestingKey::: ', nestingKey);
    return (
      <div
        key={nestingKey}
        style={{ paddingLeft: 10 * (nestingKey?.split(".")?.length || 0) }}
      >
        <label>
          <input
            type="checkbox"
            readOnly={true}
            checked={getNestedProperty(checkBox, `${nestingKey}.active`)}
            onClick={() => {
              setfirst(Math.random().toString());
              getNestedProperty(checkBox, `${nestingKey}.active`)
                ? changeChildrenToValue(
                    getNestedProperty(checkBox, `${nestingKey}`),
                    false
                  )
                : changeChildrenToValue(
                    getNestedProperty(checkBox, `${nestingKey}`),
                    true
                  );
              Object.keys(checkBox)?.forEach((singleKey) => {
                checkBox[singleKey]["active"] = changeParentValue(
                  checkBox[singleKey]
                );
              });
            }}
          />{" "}
          {nestingKey?.split(".")?.[nestingKey?.split(".")?.length - 1]}
        </label>
      </div>
    );
  };

  const renderAllComponent = (objRef: any, nestingKey: any) => {
    let arr: any = [];
    Object.keys(objRef).map((singleKey) => {
      let newNestingKey = `${nestingKey ? nestingKey + "." : ""}${singleKey}`;
      arr.push(returnComponent(newNestingKey));
      if (objRef?.[singleKey]?.child) {
        let childArr = renderAllComponent(
          objRef?.[singleKey]?.child,
          `${newNestingKey}.child`
        );
        arr.push(childArr);
      }
    });
    return arr;
  };

  useEffect(() => {
    const newobj = JSON.parse(JSON.stringify(checkBox));
    Object.keys(newobj)?.forEach((singleKey) => {
      newobj[singleKey]["active"] = changeParentValue(
        newobj[singleKey]
      );
    });
    setCheckBox(newobj);
  }, []);

  return <>{renderAllComponent(checkBox, "")}</>;
}