import * as React from "react";
import { useFormContext } from "react-hook-form";

const Form = ({ children }: { children: React.ReactNode }) => {
  return <form className="space-y-4">{children}</form>;
};

const FormItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-2">{children}</div>;
};

const FormLabel = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => {
  return <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">{children}</label>;
};

const FormControl = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-1">{children}</div>;
};

const FormMessage = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext();

  return errors[name] ? <p className="text-sm text-red-500">{String(errors[name]?.message)}</p> : null;
};

const FormField = ({
  name,
  render,
}: {
  name: string;
  render: ({ field }: { field: unknown }) => React.ReactNode;
}) => {
  const { register } = useFormContext();
  return render({ field: register(name) });
};

export { Form, FormItem, FormLabel, FormControl, FormMessage, FormField };
