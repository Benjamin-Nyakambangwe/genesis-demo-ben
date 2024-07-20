import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HeroSwitch from "./HeroSwitch";

export default function PropertiesFilter() {
  return (
    <Card className="w-full md:w-[350px]">
      <CardHeader></CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Property Types" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">House</SelectItem>
                  <SelectItem value="sveltekit">Villa</SelectItem>
                  <SelectItem value="astro">Cottage</SelectItem>
                  <SelectItem value="nuxt">Condo</SelectItem>
                  <SelectItem value="nuxt">Commercial</SelectItem>
                  <SelectItem value="nuxt">Resort</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input id="name" placeholder="Suburb, City, Province, Country" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
              <Input id="name" placeholder="Min. Price" />
              <Input id="name" placeholder="Max. Price" />
              <Input id="name" placeholder="Min. Beds" />
              <Input id="name" placeholder="Max. Beds" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <HeroSwitch />
      </CardFooter>
    </Card>
  );
}
